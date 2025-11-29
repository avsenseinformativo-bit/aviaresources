# ⚠️ IMPORTANTE: Claves de Stripe

## Estado Actual
✅ Configurado con clave LIVE de Stripe
⚠️ **NO RECOMENDADO para pruebas**

## ¿Qué significa esto?

### Clave LIVE (la que me diste)
- ❌ Cobra dinero REAL
- ❌ Requiere tarjetas reales
- ❌ Peligroso para pruebas

### Clave TEST (la que necesitamos)
- ✅ No cobra dinero real
- ✅ Usa tarjetas de prueba (4242 4242 4242 4242)
- ✅ Seguro para desarrollo

## Cómo obtener tu clave TEST

1. Ve a https://dashboard.stripe.com/test/apikeys
2. Asegúrate de estar en modo **TEST** (arriba a la derecha)
3. Copia la "Secret key" (empieza con `sk_test_...`)
4. Pásame esa clave

## Opciones

### Opción 1: Usar TEST primero (RECOMENDADO)
- Probamos con tarjetas de prueba
- Verificamos que todo funciona
- Luego cambiamos a LIVE

### Opción 2: Usar LIVE directamente (RIESGOSO)
- Tendrías que usar una tarjeta real
- Se cobrará dinero real
- Solo para cuando ya esté todo probado

## ¿Qué prefieres?

Dime si quieres:
A) Darme la clave TEST para probar seguro
B) Continuar con LIVE (tendrás que pagar de verdad para probar)
