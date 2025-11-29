# 🧪 PRUEBA RÁPIDA - Sistema de Pagos

## ✅ Lo que ya tienes listo:
- ✅ Servidor backend corriendo (puerto 3001)
- ✅ Botón de prueba €0 añadido a la página
- ✅ EmailJS configurado

## 🚀 OPCIÓN RÁPIDA: Probar SIN Deploy (Ngrok)

Vamos a usar **ngrok** para probar el sistema AHORA sin hacer deploy:

### Paso 1: Instalar ngrok
```bash
brew install ngrok
```

### Paso 2: Crear túnel
```bash
ngrok http 3001
```

Verás algo como:
```
Forwarding  https://xxxx-xx-xx-xx.ngrok-free.app -> http://localhost:3001
```

**COPIA esa URL** (la que empieza con https://)

### Paso 3: Configurar Webhook en Stripe

1. Ve a https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. Pega tu URL de ngrok + `/webhook/stripe`
   Ejemplo: `https://xxxx-xx-xx-xx.ngrok-free.app/webhook/stripe`
4. Selecciona eventos:
   - ✅ checkout.session.completed
   - ✅ customer.subscription.updated
   - ✅ customer.subscription.deleted
5. Click "Add endpoint"
6. **Copia el "Signing secret"** (empieza con `whsec_...`)

### Paso 4: Actualizar .env

Dime el `whsec_...` que copiaste y lo configuro.

### Paso 5: Probar!

1. Abre http://localhost:3000
2. Click en "🧪 Test Payment (€0.00)"
3. Completa el pago en Stripe
4. Verifica:
   - ✅ Recibes email
   - ✅ Se activan permisos
   - ✅ Ves logs en el servidor

---

## 📋 Comandos que necesitas ejecutar

```bash
# Terminal 1: Backend (ya corriendo)
cd /Users/alexvenelin/Desktop/adsensepag2/backend
npm start

# Terminal 2: Ngrok (NUEVO)
ngrok http 3001

# Terminal 3: Frontend
cd /Users/alexvenelin/Desktop/adsensepag2
python3 -m http.server 3000
```

---

## ¿Qué prefieres?

**A) Probar AHORA con ngrok** (5 minutos)
- Rápido
- Sin deploy
- Perfecto para testing

**B) Deploy permanente en Railway** (15 minutos)
- URL permanente
- Mejor para producción
- Requiere más configuración

Dime cuál prefieres y te ayudo paso a paso.
