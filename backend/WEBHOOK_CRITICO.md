# 🚨 PASO CRÍTICO: Configurar Webhook

## ¿Por qué no funciona todavía?

Tu servidor está en `localhost:3001` (solo en tu Mac).
Stripe está en internet y NO puede enviar webhooks a localhost.

**Solución:** Necesitas exponer tu servidor local a internet.

## OPCIÓN 1: Ngrok (Más Rápido - 2 minutos)

### Descargar ngrok:
1. Ve a https://ngrok.com/download
2. Descarga la versión para Mac
3. Descomprime el archivo
4. Mueve `ngrok` a tu carpeta de backend

### Ejecutar ngrok:
```bash
cd /Users/alexvenelin/Desktop/adsensepag2/backend
./ngrok http 3001
```

Verás algo como:
```
Forwarding  https://xxxx-xx-xx.ngrok-free.app -> http://localhost:3001
```

**COPIA esa URL** y dímela.

---

## OPCIÓN 2: Configurar webhook MANUALMENTE en Stripe

Si no quieres usar ngrok, puedes:

1. Ve a https://dashboard.stripe.com/webhooks
2. Click "Add endpoint"
3. Por ahora, pon una URL temporal: `https://example.com/webhook/stripe`
4. Selecciona eventos:
   - checkout.session.completed
   - customer.subscription.updated
   - customer.subscription.deleted
5. Copia el "Signing secret" (whsec_...)
6. Dímelo para configurarlo

**PERO:** Los webhooks NO funcionarán hasta que hagas deploy real.

---

## ¿Qué prefieres?

**A) Descargar ngrok** (2 min) - Funciona AHORA
**B) Configurar webhook manual** - Solo para ver el signing secret
**C) Hacer deploy a Railway** (15 min) - Solución permanente

Dime qué opción prefieres.
