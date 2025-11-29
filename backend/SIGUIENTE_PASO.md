# 🎯 SIGUIENTE PASO: Configurar Webhook en Stripe

## ✅ Estado Actual
- ✅ Servidor backend corriendo en puerto 3001
- ✅ EmailJS configurado
- ✅ Claves de Stripe configuradas (LIVE)

## 🔧 AHORA: Configurar Webhook

Como estás usando claves LIVE, necesitas configurar el webhook en Stripe Dashboard.

### Paso 1: Deploy del Backend (PRIMERO)

El webhook necesita una URL pública. Opciones:

#### Opción A: Railway (Recomendado - Gratis)
```bash
# 1. Instalar Railway CLI
npm i -g @railway/cli

# 2. Login
railway login

# 3. Deploy desde la carpeta backend
cd /Users/alexvenelin/Desktop/adsensepag2/backend
railway init
railway up
```

Esto te dará una URL como: `https://tu-app.up.railway.app`

#### Opción B: Ngrok (Temporal - Para pruebas)
```bash
# 1. Instalar ngrok
brew install ngrok

# 2. Crear túnel
ngrok http 3001
```

Esto te dará una URL temporal como: `https://xxxx-xx-xx-xx.ngrok.io`

### Paso 2: Configurar Webhook en Stripe

1. Ve a https://dashboard.stripe.com/webhooks
2. Click en "Add endpoint"
3. Endpoint URL: `https://TU-URL-AQUI/webhook/stripe`
   - Si usaste Railway: `https://tu-app.up.railway.app/webhook/stripe`
   - Si usaste ngrok: `https://xxxx.ngrok.io/webhook/stripe`

4. Selecciona estos eventos:
   - ✅ `checkout.session.completed`
   - ✅ `customer.subscription.updated`
   - ✅ `customer.subscription.deleted`
   - ✅ `invoice.payment_failed`

5. Click "Add endpoint"

6. **IMPORTANTE**: Copia el "Signing secret" (empieza con `whsec_...`)

### Paso 3: Actualizar .env con el Webhook Secret

Una vez tengas el `whsec_...`, dímelo y lo configuro.

## 🚀 ¿Qué prefieres?

**A) Railway** (recomendado para producción)
- Gratis
- URL permanente
- Fácil de configurar

**B) Ngrok** (rápido para probar ahora)
- URL temporal
- Listo en 1 minuto
- Perfecto para testing

Dime cuál prefieres y te ayudo a configurarlo.
