# 🚀 Guía Rápida de Inicio

## ✅ Estado Actual

- ✅ Backend creado en `/backend/`
- ✅ Dependencias instaladas (105 paquetes)
- ✅ Archivo `.env` creado
- ✅ `payment.js` actualizado
- ✅ Código peligroso eliminado

## 📝 PASO 1: Configurar Variables de Entorno

Edita el archivo `/backend/.env` y completa:

```env
# 1. STRIPE (Obtener de https://dashboard.stripe.com/test/apikeys)
STRIPE_SECRET_KEY=sk_test_XXXXX
STRIPE_WEBHOOK_SECRET=whsec_XXXXX  # Lo obtendrás en el paso 3

# 2. EMAILJS (Ya configurado, pero verifica)
EMAILJS_SERVICE_ID=service_7ws6omq
EMAILJS_TEMPLATE_ID=template_t0mxm9q
EMAILJS_PUBLIC_KEY=KyZVEEMuPO2WZekkD
EMAILJS_PRIVATE_KEY=XXXXX  # Obtener de EmailJS dashboard

# 3. TU EMAIL
ADMIN_EMAIL=avsenseinformativo@gmail.com

# 4. URLs (dejar así para desarrollo)
FRONTEND_URL=http://localhost:3000
PORT=3001
```

### Dónde obtener cada clave:

#### Stripe Keys:
1. Ve a https://dashboard.stripe.com/test/apikeys
2. Copia "Secret key" (empieza con `sk_test_`)
3. Pégala en `STRIPE_SECRET_KEY`

#### EmailJS Private Key:
1. Ve a https://dashboard.emailjs.com/admin/account
2. Copia "Private Key"
3. Pégala en `EMAILJS_PRIVATE_KEY`

---

## 🔧 PASO 2: Iniciar el Servidor

Abre una terminal y ejecuta:

```bash
cd backend
npm start
```

Deberías ver:
```
🚀 Servidor corriendo en puerto 3001
📧 Emails se enviarán a: avsenseinformativo@gmail.com
🔗 Webhook URL: https://tu-dominio.com/webhook/stripe
```

---

## 🔌 PASO 3: Configurar Stripe Webhooks (Desarrollo)

En OTRA terminal (deja la anterior corriendo):

```bash
# 1. Instalar Stripe CLI (solo primera vez)
brew install stripe/stripe-cli/stripe

# 2. Login en Stripe
stripe login

# 3. Iniciar webhook forwarding
stripe listen --forward-to localhost:3001/webhook/stripe
```

Verás algo como:
```
> Ready! Your webhook signing secret is whsec_xxxxxxxxxxxxx
```

**COPIA ese `whsec_xxxxx`** y pégalo en tu `.env` como `STRIPE_WEBHOOK_SECRET`

---

## 🌐 PASO 4: Iniciar Frontend

En OTRA terminal (ahora tienes 2 corriendo):

```bash
cd /Users/alexvenelin/Desktop/adsensepag2
python3 -m http.server 3000
```

---

## 🧪 PASO 5: Probar el Sistema

1. Abre http://localhost:3000
2. Click en "Subscribe Now" (Premium o Pro)
3. En Stripe Checkout usa:
   - **Tarjeta:** `4242 4242 4242 4242`
   - **Fecha:** `12/34`
   - **CVC:** `123`
   - **Email:** tu email real

4. Completa el pago

5. Verifica:
   - ✅ Terminal del backend muestra: "💰 Pago completado!"
   - ✅ Recibes un email en tu bandeja
   - ✅ Eres redirigido a success.html
   - ✅ Los permisos se activan automáticamente

---

## 🐛 Solución de Problemas

### Error: "STRIPE_SECRET_KEY no configurada"
- Edita `/backend/.env` y añade tu clave de Stripe

### Error: "Webhook signature verification failed"
- Verifica que `stripe listen` esté corriendo
- Copia el `whsec_` correcto al `.env`
- Reinicia el servidor backend

### No recibo emails
- Verifica `EMAILJS_PRIVATE_KEY` en `.env`
- Revisa logs del servidor
- Verifica que EmailJS tenga créditos (200/mes gratis)

### "Cannot connect to backend"
- Verifica que el servidor esté corriendo en puerto 3001
- Abre http://localhost:3001/health (debe mostrar `{"status":"ok"}`)

---

## 📋 Checklist Antes de Probar

- [ ] Archivo `.env` configurado con todas las claves
- [ ] Servidor backend corriendo (Terminal 1)
- [ ] Stripe webhook corriendo (Terminal 2)
- [ ] Frontend corriendo (Terminal 3)
- [ ] Stripe Dashboard en modo TEST

---

## 🎯 Próximos Pasos (Después de Probar)

Una vez que funcione localmente:

1. **Deploy a Railway** (gratis)
2. **Configurar webhook en Stripe Dashboard** (producción)
3. **Cambiar a modo LIVE** en Stripe
4. **Actualizar URL del backend** en `payment.js`

---

## 💡 Comandos Útiles

```bash
# Ver logs del servidor
cd backend && npm start

# Ver eventos de Stripe en tiempo real
stripe logs tail

# Probar webhook manualmente
stripe trigger checkout.session.completed
```

---

## 📞 ¿Necesitas Ayuda?

Si algo no funciona:
1. Revisa los logs del servidor (Terminal 1)
2. Revisa la consola del navegador (F12)
3. Verifica que todas las claves estén correctas en `.env`
