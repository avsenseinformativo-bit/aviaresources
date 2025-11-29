# 📧 SOLUCIÓN: Activar Emails desde el Backend

El error que vimos antes (`API calls are disabled for non-browser applications`) ocurre porque EmailJS bloquea por defecto el envío desde servidores (Node.js) por seguridad.

## ✅ Cómo arreglarlo (1 minuto)

1. Ve a **https://dashboard.emailjs.com/admin/account/security**
   (O ve a Account → Security)

2. Busca la opción:
   **"Allow EmailJS API for non-browser applications"**

3. **ACTÍVALA** (marca la casilla)

4. Click en **"Save Changes"** (si hay botón)

---

## 🔄 Una vez hecho esto:

1. Avísame y **volveré a activar el código de envío de emails** en el servidor.
2. Haremos otra prueba de pago.
3. ¡Debería llegar el correo!

¿Lo has activado ya?
