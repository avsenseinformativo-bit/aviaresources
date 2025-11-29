# 📧 Crear Template de Pago en EmailJS

El ID `template_t0mxm9q` es tu template de **Registro** (por eso te llega el mensaje de bienvenida).

Necesitas crear un **NUEVO Template** específico para los pagos.

## 📝 Pasos:

1. Ve a **https://dashboard.emailjs.com/admin/templates**
2. Click en **"Create New Template"**
3. Configúralo así:

**Subject (Asunto):**
```
💰 Nuevo Pago Recibido - {{plan}}
```

**Content (Contenido):**
```html
<div style="font-family: Arial, sans-serif; padding: 20px; color: #333;">
    <h2 style="color: #2563eb;">¡Nuevo Pago Recibido! 🎉</h2>
    
    <p>Has recibido un nuevo pago en AV IA Resources:</p>
    
    <div style="background: #f3f4f6; padding: 15px; border-radius: 8px; margin: 20px 0;">
        <p><strong>👤 Cliente:</strong> {{customer_email}}</p>
        <p><strong>💎 Plan:</strong> {{plan}}</p>
        <p><strong>💰 Monto:</strong> €{{amount}}</p>
        <p><strong>🔑 Código de Acceso:</strong> {{access_code}}</p>
        <p><strong>📅 Fecha:</strong> {{date}}</p>
        <p><strong>🆔 Session ID:</strong> {{session_id}}</p>
    </div>

    <hr style="border: 1px solid #eee; margin: 20px 0;">
    
    <p style="font-size: 12px; color: #666;">
        Este es un mensaje automático del sistema de pagos.
    </p>
</div>
```

4. Click en **"Save"**
5. Copia el **NUEVO Template ID** (ej: `template_xxxxxxx`)
6. **Pásame ese nuevo ID** por aquí.

---

Una vez me des el nuevo ID, lo cambio en la configuración y funcionará perfecto.
