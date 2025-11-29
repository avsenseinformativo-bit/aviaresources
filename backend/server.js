const express = require('express');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const cors = require('cors');
const emailjs = require('@emailjs/nodejs');
require('dotenv').config();

const app = express();

// CORS para permitir requests desde tu frontend
app.use(cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:3000'
}));

// Para webhooks de Stripe necesitamos el raw body
app.post('/webhook/stripe', express.raw({ type: 'application/json' }), async (req, res) => {
    const sig = req.headers['stripe-signature'];
    let event;

    try {
        // Verificar que el webhook viene realmente de Stripe
        event = stripe.webhooks.constructEvent(
            req.body,
            sig,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        console.error('⚠️ Webhook signature verification failed:', err.message);
        return res.status(400).send(`Webhook Error: ${err.message}`);
    }

    console.log('✅ Webhook recibido:', event.type);

    // Manejar diferentes eventos de Stripe
    switch (event.type) {
        case 'checkout.session.completed':
            await handleCheckoutCompleted(event.data.object);
            break;

        case 'customer.subscription.updated':
            console.log('📝 Suscripción actualizada');
            break;

        case 'customer.subscription.deleted':
            console.log('❌ Suscripción cancelada');
            break;

        default:
            console.log(`Evento no manejado: ${event.type}`);
    }

    res.json({ received: true });
});

// Resto de endpoints con JSON
app.use(express.json());

// Función para manejar pagos completados
async function handleCheckoutCompleted(session) {
    console.log('💰 Pago completado!');
    console.log('Email del cliente:', session.customer_email);
    console.log('Monto:', session.amount_total / 100);

    // Determinar el plan según el precio
    let plan = 'Free';
    let planCode = 'free';

    if (session.amount_total === 499) {
        plan = 'Premium Mensual';
        planCode = 'premium';
    } else if (session.amount_total === 999) {
        plan = 'Pro Mensual';
        planCode = 'pro';
    } else if (session.amount_total === 3499) {
        plan = 'Premium Anual';
        planCode = 'premium';
    } else if (session.amount_total === 6999) {
        plan = 'Pro Anual';
        planCode = 'pro';
    }

    // Generar código de acceso único
    const accessCode = generateAccessCode(session.customer_email, planCode);

    // Enviar email de notificación
    try {
        await sendPaymentNotification({
            customerEmail: session.customer_email,
            plan: plan,
            amount: session.amount_total / 100,
            accessCode: accessCode,
            sessionId: session.id
        });
        console.log('✅ Email enviado correctamente');
    } catch (error) {
        console.error('❌ Error enviando email:', error);
    }

    // Aquí podrías guardar en una base de datos
    // await saveToDatabase({ email: session.customer_email, plan: planCode, accessCode });
}

// Generar código de acceso único
function generateAccessCode(email, plan) {
    const timestamp = Date.now();
    const hash = require('crypto')
        .createHash('sha256')
        .update(`${email}-${plan}-${timestamp}`)
        .digest('hex')
        .substring(0, 12)
        .toUpperCase();
    return hash;
}

// Enviar notificación por email
async function sendPaymentNotification(data) {
    console.log('📧 Enviando email de notificación...');

    const templateParams = {
        to_email: process.env.ADMIN_EMAIL,
        customer_email: data.customerEmail,
        plan: data.plan,
        amount: data.amount,
        access_code: data.accessCode,
        date: new Date().toLocaleString('es-ES'),
        session_id: data.sessionId
    };

    try {
        await emailjs.send(
            process.env.EMAILJS_SERVICE_ID,
            process.env.EMAILJS_TEMPLATE_ID,
            templateParams,
            {
                publicKey: process.env.EMAILJS_PUBLIC_KEY,
                privateKey: process.env.EMAILJS_PRIVATE_KEY
            }
        );
        console.log('✅ Email enviado correctamente a ' + process.env.ADMIN_EMAIL);
    } catch (error) {
        console.error('❌ Error enviando email:', error);
    }
}

// Endpoint para verificar pago (llamado desde success.html)
app.post('/api/verify-payment', async (req, res) => {
    const { sessionId } = req.body;

    try {
        // Verificar la sesión con Stripe
        const session = await stripe.checkout.sessions.retrieve(sessionId);

        if (session.payment_status === 'paid') {
            // Determinar plan
            let plan = 'free';
            if (session.amount_total === 499 || session.amount_total === 3499) {
                plan = 'premium';
            } else if (session.amount_total === 999 || session.amount_total === 6999) {
                plan = 'pro';
            }

            res.json({
                success: true,
                plan: plan,
                email: session.customer_email,
                amount: session.amount_total / 100,
                subscriptionId: session.subscription,
                customerId: session.customer
            });
        } else {
            res.status(400).json({
                success: false,
                error: 'Payment not completed'
            });
        }
    } catch (error) {
        console.error('Error verificando pago:', error);
        res.status(500).json({
            success: false,
            error: 'Error verifying payment'
        });
    }
});

// Endpoint para cancelar suscripción
app.post('/api/cancel-subscription', async (req, res) => {
    const { subscriptionId, email } = req.body;

    if (!subscriptionId) {
        return res.status(400).json({ error: 'Subscription ID is required' });
    }

    try {
        // Cancelar al final del periodo (el usuario mantiene acceso hasta entonces)
        const subscription = await stripe.subscriptions.update(subscriptionId, {
            cancel_at_period_end: true
        });

        // Calcular fecha de fin de acceso
        const endDate = new Date(subscription.current_period_end * 1000).toLocaleDateString('es-ES');

        // Enviar email de notificación al admin
        console.log(`❌ Suscripción cancelada para ${email}. Acceso hasta: ${endDate}`);

        // Intentar enviar email si EmailJS está configurado
        try {
            const templateParams = {
                to_email: process.env.ADMIN_EMAIL,
                customer_email: email,
                plan: 'CANCELADO',
                amount: 0,
                access_code: 'CANCELADO',
                date: new Date().toLocaleString('es-ES'),
                session_id: subscriptionId,
                message: `El usuario ha cancelado su suscripción. Mantendrá acceso hasta: ${endDate}`
            };

            await emailjs.send(
                process.env.EMAILJS_SERVICE_ID,
                process.env.EMAILJS_TEMPLATE_ID, // Usamos el mismo template por ahora
                templateParams,
                {
                    publicKey: process.env.EMAILJS_PUBLIC_KEY,
                    privateKey: process.env.EMAILJS_PRIVATE_KEY
                }
            );
        } catch (emailError) {
            console.error('Error enviando email de cancelación:', emailError);
        }

        res.json({
            success: true,
            endDate: endDate,
            message: `Suscripción cancelada. Tendrás acceso hasta el ${endDate}`
        });

    } catch (error) {
        console.error('Error cancelando suscripción:', error);
        res.status(500).json({ error: 'Error al cancelar la suscripción' });
    }
});

// Health check
app.get('/health', (req, res) => {
    res.json({
        status: 'ok',
        timestamp: new Date().toISOString()
    });
});

// Iniciar servidor
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en puerto ${PORT}`);
    console.log(`📧 Emails se enviarán a: ${process.env.ADMIN_EMAIL}`);
    console.log(`🔗 Webhook URL: https://tu-dominio.com/webhook/stripe`);
});
