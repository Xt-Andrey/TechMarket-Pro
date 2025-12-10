// Definición del Menú con datos de ejemplo
const menuItems = [
    { id: 1, name: 'Hamburguesa Clásica', price: 8.50, image: 'hamburguer.jpg', description: 'Carne de res, lechuga, tomate y salsa especial.' },
    { id: 2, name: 'Papas Fritas Grandes', price: 3.00, image: 'fries.jpg', description: 'Crujientes papas fritas con sal marina.' },
    { id: 3, name: 'Doble Queso Burger', price: 12.00, image: 'double-cheese.jpg', description: 'Doble carne, doble queso, pepinillos y aderezo ranch.' },
    { id: 4, name: 'Malteada de Vainilla', price: 4.50, image: 'shake.jpg', description: 'Malteada cremosa de vainilla con topping.' },
    { id: 5, name: 'Nuggets de Pollo (x6)', price: 6.50, image: 'nuggets.jpg', description: 'Tiernos nuggets de pollo fritos a la perfección.' },
    { id: 6, name: 'Ensalada César', price: 9.50, image: 'salad.jpg', description: 'Lechuga romana, crutones, queso parmesano y pollo grillé.' }
];

// Estado global del Carrito
let cart = [];

// Constantes del DOM
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


// Función para formatear el precio a moneda
const formatPrice = (price) => `$${price.toFixed(2)}`;

// 1. RENDERIZAR LOS PRODUCTOS EN EL MENÚ
function renderMenu() {
    productsGrid.innerHTML = '';
    menuItems.forEach(item => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <img src="assets/img/${item.image}" alt="${item.name}" loading="lazy">
            <div class="product-info">
                <div>
                    <h3>${item.name}</h3>
                    <p>${item.description}</p>
                </div>
                <div class="price-add">
                    <span class="price">${formatPrice(item.price)}</span>
                    <button class="add-to-cart-btn" data-id="${item.id}">
                        Añadir <i class="fas fa-plus"></i>
                    </button>
                </div>
            </div>
        `;
        productsGrid.appendChild(card);
    });
}

// 2. LÓGICA DEL CARRITO

// Abre el sidebar del carrito
function openCart() {
    cartSidebar.classList.add('open');
    overlay.classList.add('visible');
    document.body.style.overflow = 'hidden'; // Evita scroll en el fondo
}

// Cierra el sidebar del carrito
function closeCart() {
    cartSidebar.classList.remove('open');
    overlay.classList.remove('visible');
    document.body.style.overflow = 'auto';
}

// Actualiza la visualización del carrito (HTML)
function renderCart() {
    cartItemsList.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsList.innerHTML = '<p class="empty-cart-message">Tu carrito está vacío.</p>';
    } else {
        cart.forEach(item => {
            const listItem = document.createElement('div');
            listItem.className = 'cart-item';
            listItem.dataset.id = item.id;
            listItem.innerHTML = `
                <div class="item-details">
                    <h4>${item.name}</h4>
                    <span>${formatPrice(item.price)} x ${item.quantity}</span>
                </div>
                <div class="quantity-controls">
                    <button class="decrease-quantity" data-id="${item.id}">-</button>
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

// Añade un producto al carrito
function addToCart(productId) {
    const product = menuItems.find(item => item.id === productId);
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }

    renderCart();
}

// Elimina completamente un producto del carrito
function removeItem(productId) {
    cart = cart.filter(item => item.id !== productId);
    renderCart();
}

// Cambia la cantidad de un producto
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

// Calcula y actualiza los totales y el contador
function updateCartTotals() {
    const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = cart.length > 0 ? 5.00 : 0.00; // Envío solo si hay productos
    const total = subtotal + shipping;
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);

    cartSubtotalElement.textContent = formatPrice(subtotal);
    cartTotalElement.textContent = formatPrice(total);
    cartCountElement.textContent = totalItems;
}

// 3. LISTENERS DE EVENTOS

// Listener para abrir/cerrar carrito
openCartBtn.addEventListener('click', openCart);
closeCartBtn.addEventListener('click', closeCart);
overlay.addEventListener('click', closeCart);

// Listener para añadir productos al menú (usa delegación de eventos)
productsGrid.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart-btn')) {
        const productId = parseInt(e.target.dataset.id);
        addToCart(productId);
        // Opcional: abrir el carrito al añadir el primer producto
        if (!cartSidebar.classList.contains('open')) {
             openCart();
        }
    }
});

// Listener para los controles dentro del carrito (delegación de eventos)
cartItemsList.addEventListener('click', (e) => {
    const target = e.target;
    const isButton = target.tagName === 'BUTTON' || target.closest('button');
    if (!isButton) return;

    const button = target.closest('button');
    const productId = parseInt(button.dataset.id);

    if (button.classList.contains('remove-item-btn') || target.closest('.remove-item-btn')) {
        removeItem(productId);
    } else if (button.classList.contains('increase-quantity')) {
        changeQuantity(productId, 'increase');
    } else if (button.classList.contains('decrease-quantity')) {
        changeQuantity(productId, 'decrease');
    }
});

// Listener para el botón de Finalizar Pedido
checkoutBtn.addEventListener('click', () => {
    if (cart.length > 0) {
        alert(`Pedido finalizado. Total a pagar: ${cartTotalElement.textContent}\n¡Gracias por tu compra en Fast Food Bites!`);
        // Simular un vaciado de carrito después del checkout
        cart = [];
        renderCart();
        closeCart();
    } else {
        alert('Tu carrito está vacío. Por favor, añade productos para finalizar tu pedido.');
    }
});


// Inicialización del proyecto
document.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    renderCart(); // Renderiza el carrito inicialmente (vacío)
});