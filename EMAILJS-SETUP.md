# 📧 Configuración de EmailJS para Notificaciones

## ¿Qué es EmailJS?

EmailJS es un servicio gratuito que permite enviar emails directamente desde JavaScript sin necesidad de un backend. Perfecto para tu sistema de autenticación.

---

## 🚀 Paso 1: Crear Cuenta en EmailJS

1. Ve a [https://www.emailjs.com/](https://www.emailjs.com/)
2. Haz clic en **"Sign Up"**
3. Regístrate con tu email
4. Verifica tu email

---

## 📝 Paso 2: Configurar Servicio de Email

1. En el dashboard, ve a **"Email Services"**
2. Haz clic en **"Add New Service"**
3. Selecciona tu proveedor de email (Gmail, Outlook, etc.)
4. Sigue las instrucciones para conectar tu cuenta
5. **Copia el Service ID** (ejemplo: `service_abc123`)

---

## 📄 Paso 3: Crear Template de Email

1. Ve a **"Email Templates"**
2. Haz clic en **"Create New Template"**
3. Configura el template así:

### Template Settings:
- **Template Name:** `new_user_registration`
- **Subject:** `🎉 Nuevo registro en AV IA Resources`

### Template Content:
```
Hola,

Un nuevo usuario se ha registrado en AV IA Resources:

👤 Nombre: {{user_name}}
📧 Email: {{user_email}}
📅 Fecha de registro: {{registered_at}}

---
Este es un email automático del sistema de autenticación.
```

4. **Copia el Template ID** (ejemplo: `template_xyz789`)

---

## 🔑 Paso 4: Obtener Public Key

1. Ve a **"Account"** → **"General"**
2. Busca **"Public Key"**
3. **Copia la Public Key** (ejemplo: `abcdefghijklmnop`)

---

## ⚙️ Paso 5: Configurar en tu Código

Abre el archivo `auth.js` y reemplaza las credenciales:

```javascript
const EMAILJS_CONFIG = {
    serviceId: 'service_abc123',      // Tu Service ID
    templateId: 'template_xyz789',    // Tu Template ID
    publicKey: 'abcdefghijklmnop'     // Tu Public Key
};
```

También actualiza el email de destino en la línea ~335:

```javascript
to_email: 'tu-email@ejemplo.com'  // Tu email donde recibirás las notificaciones
```

---

## ✅ Paso 6: Probar el Sistema

1. Abre `index.html` en tu navegador
2. Haz clic en el botón **"Login"**
3. Ve a la pestaña **"Register"**
4. Llena el formulario:
   - Nombre: Tu nombre
   - Email: test@example.com
   - Contraseña: test123
5. Haz clic en **"Create Account"**
6. Revisa tu email configurado en EmailJS

---

## 📊 Límites del Plan Gratuito

- **200 emails/mes** gratis
- Suficiente para empezar
- Puedes actualizar a plan de pago si necesitas más

---

## 🔧 Troubleshooting

### No llegan los emails
1. Verifica que las credenciales estén correctas
2. Revisa la consola del navegador (F12) para errores
3. Verifica que el template tenga las variables correctas: `{{user_name}}`, `{{user_email}}`, `{{registered_at}}`

### Error "EmailJS not initialized"
- Espera unos segundos después de cargar la página
- El script de EmailJS se carga dinámicamente

### Error "Invalid public key"
- Verifica que copiaste la Public Key completa
- No incluyas espacios al inicio o final

---

## 🎯 Próximos Pasos

Una vez configurado EmailJS:
1. Prueba registrando varios usuarios
2. Verifica que lleguen los emails
3. Personaliza el template de email a tu gusto
4. ¡Listo! Tu sistema de autenticación está completo

---

## 📞 Soporte

Si tienes problemas, revisa la documentación de EmailJS:
- [Documentación oficial](https://www.emailjs.com/docs/)
- [Ejemplos de código](https://www.emailjs.com/docs/examples/)
