document.addEventListener('DOMContentLoaded', async () => {
    // Obtener session_id de Stripe desde la URL
    const urlParams = new URLSearchParams(window.location.search);
    const sessionId = urlParams.get('session_id');

    console.log('💳 Verificando pago con Stripe...');

    if (!sessionId) {
        console.error('❌ No session_id found in URL');
        showError('No se encontró información del pago. Por favor contacta soporte.');
        return;
    }

    try {
        // Verificar el pago con nuestro backend
        const BACKEND_URL = 'http://localhost:3001'; // Cambiar en producción

        const response = await fetch(`${BACKEND_URL}/api/verify-payment`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ sessionId })
        });

        const data = await response.json();

        if (data.success) {
            console.log('✅ Pago verificado exitosamente!');
            activatePlan(data.plan, data.email, data.subscriptionId, data.customerId);
        } else {
            throw new Error(data.error || 'Payment verification failed');
        }
    } catch (error) {
        console.error('❌ Error verificando pago:', error);
        showError('Error al verificar el pago. Por favor contacta soporte con tu email de pago.');
    }
});

function activatePlan(planType, email, subscriptionId, customerId) {
    console.log(`🎉 Activando plan: ${planType} para ${email}`);

    // 1. Obtener o crear usuario
    let currentUser = JSON.parse(localStorage.getItem('aviaUser'));

    if (!currentUser) {
        // Si no hay usuario logueado, crear uno temporal con el email del pago
        currentUser = {
            email: email,
            name: email.split('@')[0],
            registeredAt: new Date().toISOString()
        };
    }

    // 2. Actualizar plan del usuario
    currentUser.plan = planType;
    currentUser.paidAt = new Date().toISOString();
    currentUser.subscriptionId = subscriptionId; // Guardar ID de suscripción
    currentUser.customerId = customerId;         // Guardar ID de cliente

    if (planType === 'premium') {
        currentUser.premiumSince = new Date().toISOString();
        localStorage.setItem('hasPremiumAccess', 'true');
    } else if (planType === 'pro') {
        currentUser.proSince = new Date().toISOString();
        localStorage.setItem('hasPremiumAccess', 'true');
        localStorage.setItem('hasProAccess', 'true');
    }

    // 3. Guardar usuario actualizado
    localStorage.setItem('aviaUser', JSON.stringify(currentUser));

    // 4. Actualizar lista de usuarios
    const allUsers = JSON.parse(localStorage.getItem('aviaUsers') || '[]');
    const userIndex = allUsers.findIndex(u => u.email === currentUser.email);
    if (userIndex !== -1) {
        allUsers[userIndex] = { ...allUsers[userIndex], ...currentUser };
    } else {
        allUsers.push(currentUser);
    }
    localStorage.setItem('aviaUsers', JSON.stringify(allUsers));

    console.log('✅ Plan activado exitosamente!');

    // 5. Mostrar mensaje de éxito y redirigir
    document.getElementById('activationLoader').style.display = 'none';
    document.getElementById('redirectMessage').style.display = 'block';

    setTimeout(() => {
        window.location.href = 'index.html?upgraded=true';
    }, 2000);
}

function showError(message) {
    document.getElementById('activationLoader').style.display = 'none';
    const messageEl = document.querySelector('.success-message');
    if (messageEl) {
        messageEl.innerHTML = `<strong>❌ Error:</strong> ${message}`;
        messageEl.style.color = '#ef4444';
    }
}
