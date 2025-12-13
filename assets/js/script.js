// --- DATOS DEL MENÚ (URLs de imágenes de Unsplash como ejemplo) ---
const menuItems = [
    { id: 1, name: 'Hamburguesa Clásica Premium', price: 34000.00, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=600&h=400&fit=crop', description: 'Carne Angus, lechuga fresca, tomate orgánico y nuestra salsa secreta.', badge: 'Popular' },
    { id: 2, name: 'Papas Fritas Artesanales', price: 12000.00, image: 'https://images.unsplash.com/photo-1573080496219-bb080dd4f877?w=600&h=400&fit=crop', description: 'Papas cortadas a mano, fritas en aceite premium con sal marina.' },
    { id: 3, name: 'Doble Queso Deluxe', price: 48000.00, image: 'https://images.unsplash.com/photo-1550547660-d9450f859349?w=600&h=400&fit=crop', description: 'Doble carne premium, queso madurado, pepinillos y aderezo especial.', badge: 'Nuevo' },
    { id: 4, name: 'Malteada Vainilla Bourbon', price: 18000.00, image: 'https://images.unsplash.com/photo-1572490122747-3968b75cc699?w=600&h=400&fit=crop', description: 'Malteada cremosa de vainilla con un toque de sabor a bourbon.' },
    { id: 5, name: 'Nuggets de Pollo Crujientes (x6)', price: 26000.00, image: 'https://images.unsplash.com/photo-1626075908129-9e8a5b28b746?w=600&h=400&fit=crop', description: 'Pollo de corral, empanizado en panko japonés. Pídelo con tu salsa favorita.' }, // CORREGIDA: URL de imagen
    { id: 6, name: 'Ensalada Premium con Pollo', price: 38000.00, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=600&h=400&fit=crop', description: 'Ensalada fresca con pollo a la parrilla, aderezo cítrico y nueces.', badge: 'Fit' }
];

// --- ESTADO GLOBAL ---
let cart = [];

// --- CONSTANTES DEL DOM ---
const productsGrid = document.getElementById('products-grid');
const cartSidebar = document.getElementById('cart-sidebar');
const openCartBtn = document.getElementById('open-cart-btn');
const closeCartBtn = document.getElementById('close-cart-btn');
const overlay = document.getElementById('overlay');
const cartItemsList = document.getElementById('cart-items-list');
const cartCountElement = document.getElementById('cart-count');
const cartSubtotalElement = document.getElementById('cart-subtotal');
const cartTotalElement = document.getElementById('cart-total');
const checkoutBtn = document.getElementById('checkout-btn');

// --- CONSTANTES DEL DOM (MODAL DE USUARIO) ---
const userModal = document.getElementById('user-modal');
const openLoginBtnDesktop = document.getElementById('open-login-btn-desktop');
const openLoginBtnMobile = document.getElementById('open-login-btn-mobile');
const closeUserModalBtn = document.getElementById('close-user-modal');
const tabButtons = document.querySelectorAll('.user-tabs .tab-button');
const loginFormTab = document.getElementById('login-form-tab');
const registerFormTab = document.getElementById('register-form-tab');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');

// --- CONSTANTES DEL DOM (MODAL DE SUGERENCIAS) ---
const suggestionModal = document.getElementById('suggestion-modal');
const openSuggestionBtn = document.getElementById('open-suggestion-btn');
const openSuggestionBtnMobile = document.getElementById('open-suggestion-btn-mobile');
const closeSuggestionModalBtn = document.getElementById('close-suggestion-modal');
const suggestionForm = document.getElementById('suggestion-form');


// --- LÓGICA DEL CARRUSEL (EXISTENTE) ---
const sliderTrack = document.getElementById('slider-track');
const sliderDots = document.getElementById('slider-dots');
let currentSlide = 0;
const totalSlides = 2; 
let slideInterval;

function moveToSlide(index) {
    if (index >= totalSlides) index = 0;
    if (index < 0) index = totalSlides - 1;

    currentSlide = index;
    const offset = -index * 50; 
    if (sliderTrack) {
        sliderTrack.style.transform = `translateX(${offset}%)`;
    }

    if (sliderDots) {
        const dots = sliderDots.querySelectorAll('.dot');
        dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === currentSlide);
        });
    }
}

function startSlider() {
    if (sliderTrack) {
        slideInterval = setInterval(() => {
            moveToSlide(currentSlide + 1);
        }, 4000); 
    }
}

function handleDotClick(e) {
    if (e.target.classList.contains('dot')) {
        clearInterval(slideInterval); 
        const slideIndex = parseInt(e.target.dataset.slide);
        moveToSlide(slideIndex);
        startSlider(); 
    }
}

// --- UTILIDADES ---
function createParticles() {
    const heroParticles = document.querySelector('.hero-particles');
    for(let i = 0; i < 30; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animationDelay = Math.random() * 5 + 's';
        particle.style.animationDuration = (Math.random() * 10 + 10) + 's';
        heroParticles.appendChild(particle);
    }
}

// CAMBIO: Formato de precio a COP (Pesos Colombianos) - Se usa el símbolo '$' por convención
const formatPrice = (price) => `$${price.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}`;

// --- LÓGICA DEL MENÚ (EXISTENTE) ---
function renderMenu() {
    productsGrid.innerHTML = '';
    menuItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="product-image-wrapper">
                <img src="${item.image}" alt="${item.name}" loading="lazy">
                ${item.badge ? `<div class="product-badge">${item.badge}</div>` : ''}
                <div class="product-glow"></div>
            </div>
            <div class="product-info">
                <h3 class="product-name">${item.name}</h3>
                <p class="product-description">${item.description}</p>
                <div class="product-footer">
                    <div class="product-price">${formatPrice(item.price)}</div>
                    <button class="add-to-cart-btn" data-id="${item.id}">
                        <span>Añadir</span>
                        <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        `;
        productsGrid.appendChild(card);
    });
}

// --- LÓGICA DEL CARRITO (EXISTENTE) ---
function openCart() {
    cartSidebar.classList.add('open');
    overlay.classList.add('visible');
    document.body.style.overflow = 'hidden'; 
}

function closeCart() {
    cartSidebar.classList.remove('open');
    overlay.classList.remove('visible');
    document.body.style.overflow = 'auto';
}

function renderCart() {
    cartItemsList.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsList.innerHTML = `
            <div class="empty-cart-message">
                <i class="fas fa-shopping-cart"></i>
                <p>Tu carrito está vacío</p>
            </div>
        `;
    } else {
        cart.forEach(item => {
            const listItem = document.createElement('div');
            listItem.className = 'cart-item';
            listItem.innerHTML = `
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <span>${formatPrice(item.price)} × ${item.quantity}</span>
                </div>
                <div class="quantity-controls">
                    <button class="decrease-quantity" data-id="${item.id}">−</button>
                    <span>${item.quantity}</span>
                    <button class="increase-quantity" data-id="${item.id}">+</button>
                </div>
                <button class="remove-item-btn" data-id="${item.id}">
                    <i class="fas fa-trash"></i>
                </button>
            `;
            cartItemsList.appendChild(listItem);
        });
    }
    
    updateCartTotals();
}

function addToCart(productId) {
    const product = menuItems.find(item => item.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    renderCart();
    
    const countEl = document.getElementById('cart-count');
    countEl.style.animation = 'none';
    setTimeout(() => {
        countEl.style.animation = 'pulse 0.5s ease';
    }, 10);
}

function removeItem(productId) {
    cart = cart.filter(item => item.id !== productId);
    renderCart();
}

function changeQuantity(productId, type) {
    const item = cart.find(i => i.id === productId);
    if (!item) return;

    if (type === 'increase') {
        item.quantity++;
    } else if (type === 'decrease') {
        item.quantity--;
        if (item.quantity <= 0) {
            removeItem(productId);
            return;
        }
    }
    renderCart();
}

function updateCartTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    // Precio de envío a COP ($9,000)
    const shipping = cart.length > 0 ? 9000.00 : 0.00; 
    const total = subtotal + shipping;
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    const cartShippingElement = document.getElementById('cart-shipping-price');
    if (cartShippingElement) {
        cartShippingElement.textContent = formatPrice(shipping);
    }

    cartSubtotalElement.textContent = formatPrice(subtotal);
    cartTotalElement.textContent = formatPrice(total);
    cartCountElement.textContent = totalItems;
}

// --- LÓGICA DE PROMOCIONES (Ajustada según solicitud) ---
function handlePromoClick(e) {
    const btn = e.target.closest('.promo-btn');
    if (!btn) return;

    const promoId = parseInt(btn.dataset.promoId);

    if (btn.textContent.includes('Ver Oferta')) {
        // Al hacer clic en "Ver Oferta", se muestra el detalle
        if (promoId === 1) {
            alert('Detalle de la Promoción:\n\n🍔 Doble Martes de Burger\n\n¡Compra una Hamburguesa Clásica Premium, la segunda a mitad de precio! Aplicable a la de menor valor. Exclusivo para pedidos online. ¡Aprovecha la oferta!');
        } else if (promoId === 2) {
            alert('Detalle de la Promoción:\n\n🍟 Combo Familiar Deluxe\n\nIncluye: 4 Hamburguesas Clásicas Premium, 1 Porción de Papas Fritas Artesanales (tamaño familiar) y 2 Malteadas Vainilla Bourbon. Precio total: $145,000. ¡Disfruta en familia!');
        }
    } else if (btn.textContent.includes('Pedir Ahora')) {
        // Al hacer clic en "Pedir Ahora", el combo se agrega al carrito
        if (promoId === 2) {
            // Combo: 4x H. Clásica (id: 1), 1x Papas (id: 2), 2x Malteadas (id: 4)
            addToCart(1); 
            addToCart(1);
            addToCart(1);
            addToCart(1);
            addToCart(2); 
            addToCart(4); 
            addToCart(4);

            alert('✅ Combo Familiar Deluxe agregado al carrito. ¡A disfrutar!');
            if (!cartSidebar.classList.contains('open')) {
                 openCart();
            }
        }
    }
}

// --- LÓGICA DEL MODAL DE USUARIO (EXISTENTE) ---

function openUserModal() {
    userModal.classList.add('open');
    overlay.classList.add('visible');
    document.body.style.overflow = 'hidden'; 
}

function closeUserModal() {
    userModal.classList.remove('open');
    overlay.classList.remove('visible');
    document.body.style.overflow = 'auto';
}

function switchTab(tabName) {
    // 1. Ocultar todos los contenidos de las pestañas
    loginFormTab.classList.add('hidden');
    registerFormTab.classList.add('hidden');

    // 2. Mostrar la pestaña activa
    if (tabName === 'login') {
        loginFormTab.classList.remove('hidden');
    } else if (tabName === 'register') {
        registerFormTab.classList.remove('hidden');
    }

    // 3. Actualizar la clase 'active' en los botones
    tabButtons.forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.tab === tabName) {
            btn.classList.add('active');
        }
    });
}

// --- LÓGICA DEL MODAL DE SUGERENCIAS (Mantenido y es el punto de acceso principal) ---

function openSuggestionModal() {
    suggestionModal.classList.add('open');
    overlay.classList.add('visible');
    document.body.style.overflow = 'hidden'; 
}

function closeSuggestionModal() {
    suggestionModal.classList.remove('open');
    overlay.classList.remove('visible');
    document.body.style.overflow = 'auto';
}

// --- LÓGICA DE FORMULARIOS DE AUTENTICACIÓN (Simulación) ---

if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('login-email').value;
        // Lógica de inicio de sesión simulada
        alert(`¡Bienvenido! Has iniciado sesión como: ${email}`);
        closeUserModal();
        loginForm.reset();
    });
}

if (registerForm) {
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('register-name').value;
        const email = document.getElementById('register-email').value;
        // Lógica de registro simulada
        alert(`¡Registro Exitoso! Bienvenido/a, ${name}. Por favor, inicia sesión con tu correo: ${email}`);
        
        // Cambiar a la pestaña de inicio de sesión después del registro
        switchTab('login');
        registerForm.reset();
    });
}

// --- LÓGICA DE FORMULARIO DE SUGERENCIAS (Mantenido) ---

if (suggestionForm) {
    suggestionForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const email = document.getElementById('suggestion-email').value;
        const subject = document.getElementById('suggestion-subject').value;
        const message = document.getElementById('suggestion-message').value;

        alert(`✅ Sugerencia Recibida!\n\nDe: ${email}\nAsunto: ${subject}\n\nGracias por ayudarnos a mejorar.`);
        
        closeSuggestionModal();
        suggestionForm.reset();
    });
}


// --- LISTENERS DE EVENTOS (FINAL) ---

// Carrito
openCartBtn.addEventListener('click', openCart);
closeCartBtn.addEventListener('click', closeCart);

// Modal de Usuario
if (openLoginBtnDesktop) {
    openLoginBtnDesktop.addEventListener('click', openUserModal);
}
if (openLoginBtnMobile) {
    openLoginBtnMobile.addEventListener('click', openUserModal);
}
closeUserModalBtn.addEventListener('click', closeUserModal);

// Modal de Sugerencias (Se abre solo el modal)
if (openSuggestionBtn) {
    openSuggestionBtn.addEventListener('click', openSuggestionModal);
}
if (openSuggestionBtnMobile) { 
    openSuggestionBtnMobile.addEventListener('click', openSuggestionModal);
}
if (closeSuggestionModalBtn) {
    closeSuggestionModalBtn.addEventListener('click', closeSuggestionModal);
}


// Delegación para cerrar el modal o carrito al hacer clic en el overlay
overlay.addEventListener('click', (e) => {
    if (cartSidebar.classList.contains('open')) {
        closeCart();
    }
    if (userModal.classList.contains('open')) {
        closeUserModal();
    }
    // Cierre del modal de Sugerencias
    if (suggestionModal.classList.contains('open')) {
        closeSuggestionModal();
    }
});

// Navegación por pestañas
tabButtons.forEach(button => {
    button.addEventListener('click', function() {
        switchTab(this.dataset.tab);
    });
});

// Carrusel y Promociones
const promotionsSlider = document.querySelector('.promotions-slider');
if (promotionsSlider) {
    promotionsSlider.addEventListener('click', handlePromoClick);
}

if (sliderDots) {
    sliderDots.addEventListener('click', handleDotClick);
}

// Delegación de eventos para añadir productos 
productsGrid.addEventListener('click', (e) => {
    const btn = e.target.closest('.add-to-cart-btn');
    if (btn) {
        const productId = parseInt(btn.dataset.id);
        addToCart(productId);
        if (!cartSidebar.classList.contains('open')) {
            openCart();
        }
    }
});

// Delegación de eventos para controles del carrito 
cartItemsList.addEventListener('click', (e) => {
    const button = e.target.closest('button');
    if (!button) return;

    const productId = parseInt(button.dataset.id);

    if (button.classList.contains('remove-item-btn')) {
        removeItem(productId);
    } else if (button.classList.contains('increase-quantity')) {
        changeQuantity(productId, 'increase');
    } else if (button.classList.contains('decrease-quantity')) {
        changeQuantity(productId, 'decrease');
    }
});

// Botón de Finalizar Pedido 
checkoutBtn.addEventListener('click', () => {
    if (cart.length > 0) {
        alert(`🎉 ¡Pedido confirmado!\n\nTotal: ${cartTotalElement.textContent}\n\n✨ Gracias por elegir Fast Food Bites Premium!`);
        cart = [];
        renderCart();
        closeCart();
    } else {
        alert('Tu carrito está vacío. ¡Explora nuestro menú exclusivo!');
    }
});

// --- INICIALIZACIÓN ---
document.addEventListener('DOMContentLoaded', () => {
    createParticles(); 
    renderMenu();
    renderCart();
    startSlider(); 

    // 2. Actualiza el año en el footer (Derechos Registrados)
    document.getElementById('current-year').textContent = new Date().getFullYear();
    
    // Iniciar siempre en la pestaña de Iniciar Sesión por defecto
    switchTab('login');
});