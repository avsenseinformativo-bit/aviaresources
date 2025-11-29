# 🚀 Guía de Instalación - Sistema de Pagos con Stripe

## 📋 Resumen

Este sistema permite:
✅ Recibir notificaciones por email cuando alguien paga
✅ Verificar pagos reales con Stripe
✅ Desbloquear automáticamente Premium o Pro

---

## 🛠️ PASO 1: Instalar el Backend

### 1.1 Instalar dependencias

```bash
cd backend
npm install
```

### 1.2 Configurar variables de entorno

Copia el archivo `.env.example` a `.env`:

```bash
cp .env.example .env
```

Edita `.env` con tus credenciales:

```env
# Stripe (obtener de https://dashboard.stripe.com/test/apikeys)
STRIPE_SECRET_KEY=sk_test_tu_clave_aqui
STRIPE_WEBHOOK_SECRET=whsec_tu_webhook_secret_aqui

# EmailJS (obtener de https://dashboard.emailjs.com/)
EMAILJS_SERVICE_ID=service_7ws6omq
EMAILJS_TEMPLATE_ID=template_t0mxm9q
EMAILJS_PUBLIC_KEY=KyZVEEMuPO2WZekkD
EMAILJS_PRIVATE_KEY=tu_private_key_aqui

# Tu email para recibir notificaciones
ADMIN_EMAIL=avsenseinformativo@gmail.com

# URLs
FRONTEND_URL=http://localhost:3000
PORT=3001
```

---

## 📧 PASO 2: Configurar EmailJS

### 2.1 Crear cuenta en EmailJS

1. Ve a https://www.emailjs.com/
2. Regístrate gratis (200 emails/mes)
3. Verifica tu email

### 2.2 Crear servicio de email

1. Dashboard → Email Services → Add New Service
2. Selecciona Gmail (o tu proveedor)
3. Conecta tu cuenta de Gmail
4. Copia el **Service ID**

### 2.3 Crear plantilla de email

1. Dashboard → Email Templates → Create New Template
2. Usa esta plantilla:

**Subject:**
```
💰 Nuevo Pago Recibido - {{plan}}
```

**Body:**
```html
<h2>¡Nuevo Pago Recibido!</h2>

<p>Has recibido un nuevo pago en AV IA Resources:</p>

<ul>
    <li><strong>Cliente:</strong> {{customer_email}}</li>
    <li><strong>Plan:</strong> {{plan}}</li>
    <li><strong>Monto:</strong> ${{amount}}</li>
    <li><strong>Fecha:</strong> {{date}}</li>
    <li><strong>Session ID:</strong> {{session_id}}</li>
</ul>

<p><strong>Código de acceso:</strong> <code>{{access_code}}</code></p>

<hr>
<p style="color: #666; font-size: 12px;">
    Notificación automática de AV IA Resources
</p>
```

3. Guarda y copia el **Template ID**

### 2.4 Obtener claves

1. Dashboard → Account → General
2. Copia **Public Key** y **Private Key**
3. Actualiza tu archivo `.env`

---

## 🔌 PASO 3: Configurar Stripe Webhooks

### 3.1 Instalar Stripe CLI (para desarrollo local)

```bash
# macOS
brew install stripe/stripe-cli/stripe

# Verificar instalación
stripe --version
```

### 3.2 Login en Stripe

```bash
stripe login
```

Esto abrirá tu navegador para autorizar.

### 3.3 Obtener webhook secret (desarrollo)

```bash
stripe listen --forward-to localhost:3001/webhook/stripe
```

Copia el `webhook signing secret` que aparece (empieza con `whsec_...`) y ponlo en tu `.env`

**IMPORTANTE:** Deja este comando corriendo en una terminal mientras desarrollas.

---

## 🚀 PASO 4: Iniciar el Servidor

### 4.1 Modo desarrollo (local)

Terminal 1 - Backend:
```bash
cd backend
npm run dev
```

Terminal 2 - Stripe webhooks:
```bash
stripe listen --forward-to localhost:3001/webhook/stripe
```

Terminal 3 - Frontend:
```bash
cd ..
python3 -m http.server 3000
```

### 4.2 Verificar que funciona

Abre http://localhost:3001/health

Deberías ver:
```json
{
  "status": "ok",
  "timestamp": "2025-11-29T..."
}
```

---

## 🧪 PASO 5: Probar el Sistema

### 5.1 Usar tarjeta de prueba de Stripe

1. Ve a http://localhost:3000
2. Click en "Subscribe Now" (Premium o Pro)
3. En el checkout de Stripe, usa:
   - **Tarjeta:** `4242 4242 4242 4242`
   - **Fecha:** Cualquier fecha futura
   - **CVC:** Cualquier 3 dígitos
   - **Email:** tu email real

### 5.2 Verificar el flujo

1. ✅ Deberías ver en la terminal del backend:
   ```
   ✅ Webhook recibido: checkout.session.completed
   💰 Pago completado!
   Email del cliente: tu@email.com
   ✅ Email enviado correctamente
   ```

2. ✅ Deberías recibir un email en tu bandeja de entrada

3. ✅ Deberías ser redirigido a `success.html`

4. ✅ El plan debería activarse automáticamente

---

## 🌐 PASO 6: Deploy a Producción

### 6.1 Deploy del Backend en Railway

1. Crea cuenta en https://railway.app/
2. Instala Railway CLI:
   ```bash
   npm i -g @railway/cli
   ```

3. Login:
   ```bash
   railway login
   ```

4. Deploy:
   ```bash
   cd backend
   railway init
   railway up
   ```

5. Configura variables de entorno en Railway Dashboard

6. Copia la URL de tu servidor (ej: `https://tu-app.railway.app`)

### 6.2 Configurar Webhook en Stripe (producción)

1. Ve a https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. URL: `https://tu-app.railway.app/webhook/stripe`
4. Selecciona eventos:
   - `checkout.session.completed`
   - `customer.subscription.updated`
   - `customer.subscription.deleted`
5. Copia el **Signing secret** y actualízalo en Railway

### 6.3 Actualizar Frontend

En `payment.js`, cambia:
```javascript
const BACKEND_URL = 'https://tu-app.railway.app';
```

### 6.4 Activar modo LIVE en Stripe

1. Stripe Dashboard → Developers → API Keys
2. Cambia de "Test mode" a "Live mode"
3. Copia las claves LIVE y actualízalas en Railway
4. Actualiza el webhook con las claves LIVE

---

## ✅ Checklist Final

Antes de lanzar, verifica:

- [ ] Backend desplegado y funcionando
- [ ] Webhook configurado en Stripe (modo LIVE)
- [ ] EmailJS configurado y probado
- [ ] Variables de entorno correctas en producción
- [ ] Frontend apunta a URL correcta del backend
- [ ] Probado con tarjeta de prueba
- [ ] Probado con tarjeta real (pequeño monto)
- [ ] Emails se reciben correctamente
- [ ] Permisos se desbloquean automáticamente

---

## 🐛 Troubleshooting

### No recibo emails

1. Verifica credenciales de EmailJS en `.env`
2. Revisa logs del servidor
3. Verifica límite de emails (200/mes en plan gratuito)

### Webhook no funciona

1. Verifica que `STRIPE_WEBHOOK_SECRET` es correcto
2. Revisa logs: `stripe logs tail`
3. Verifica que el endpoint está accesible

### Pago no se verifica

1. Verifica que `session_id` está en la URL
2. Revisa console del navegador (F12)
3. Verifica que backend está corriendo

---

## 💰 Costos

- **Railway**: $0 (500 horas/mes gratis)
- **EmailJS**: $0 (200 emails/mes)
- **Stripe**: 2.9% + $0.30 por transacción

**Total infraestructura**: $0/mes

---

## 📞 Soporte

Si tienes problemas:
1. Revisa los logs del servidor
2. Revisa la consola del navegador
3. Verifica que todas las variables de entorno están correctas
