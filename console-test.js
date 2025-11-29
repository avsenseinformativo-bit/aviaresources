// SCRIPT DE PRUEBA SIMPLE - Pega esto en la consola del navegador

console.log('=== TEST DE AUTENTICACIÓN ===');

// 1. Verificar si auth.js se cargó
if (typeof AuthSystem !== 'undefined') {
    console.log('✅ AuthSystem existe');
} else {
    console.error('❌ AuthSystem NO existe');
}

// 2. Verificar si se inicializó
if (window.authSystem) {
    console.log('✅ window.authSystem inicializado');
} else {
    console.error('❌ window.authSystem NO inicializado');
}

// 3. Verificar el botón
const btn = document.getElementById('loginBtn');
if (btn) {
    console.log('✅ Botón Login encontrado');
    console.log('Listeners en el botón:', getEventListeners(btn));
} else {
    console.error('❌ Botón Login NO encontrado');
}

// 4. Probar abrir modal manualmente
if (window.authSystem && typeof window.authSystem.showLoginModal === 'function') {
    console.log('✅ Función showLoginModal existe');
    console.log('Probando abrir modal...');
    window.authSystem.showLoginModal();
} else {
    console.error('❌ Función showLoginModal NO existe');
}
