// Cart functionality
let cart = JSON.parse(localStorage.getItem('cart')) || [];

// Add to cart
function addToCart(productId) {
    // Get all products from different categories
    const allProducts = [
        ...products,
        ...menProducts,
        ...womenProducts,
        ...kidsProducts,
        ...accessoriesProducts,
        ...saleProducts
    ];
    
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;
    
    const existingItem = cart.find(item => item.id === productId);
    
    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.salePrice || product.price,
            image: product.image,
            quantity: 1
        });
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification('Product added to cart!');
}

// Remove from cart
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
    updateCartCount();
    showNotification('Product removed from cart!');
}

// Update quantity
function updateQuantity(productId, newQuantity) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity = Math.max(1, newQuantity);
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCart();
    }
}

// Clear cart
function clearCart() {
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    loadCart();
    updateCartCount();
    showNotification('Cart cleared!');
}

// Load cart
function loadCart() {
    const cartItems = document.getElementById('cartItems');
    const cartSummary = document.getElementById('cartSummary');
    
    if (!cartItems || !cartSummary) return;
    
    if (cart.length === 0) {
        cartItems.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added any items to your cart yet.</p>
                <a href="index.html" class="btn">Continue Shopping</a>
            </div>
        `;
        cartSummary.innerHTML = '';
        return;
    }
    
    // Load cart items
    cartItems.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}">
            <div class="cart-item-details">
                <h3 class="cart-item-title">${item.name}</h3>
                <p class="cart-item-price">$${item.price}</p>
                <div class="cart-item-quantity">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <input type="number" class="quantity-input" value="${item.quantity}" 
                           onchange="updateQuantity(${item.id}, this.value)">
                    <button class="quantity-btn" onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
            </div>
            <i class="fas fa-trash remove-item" onclick="removeFromCart(${item.id})"></i>
        </div>
    `).join('');
    
    // Calculate totals
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 10 : 0;
    const total = subtotal + shipping;
    
    // Load cart summary
    cartSummary.innerHTML = `
        <div class="summary-row">
            <span>Subtotal</span>
            <span>$${subtotal.toFixed(2)}</span>
        </div>
        <div class="summary-row">
            <span>Shipping</span>
            <span>${shipping > 0 ? `$${shipping.toFixed(2)}` : 'Free'}</span>
        </div>
        <div class="summary-row summary-total">
            <span>Total</span>
            <span>$${total.toFixed(2)}</span>
        </div>
    `;
}

// Update cart count in header
function updateCartCount() {
    const cartCount = document.getElementById('cartCount');
    if (cartCount) {
        const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
        cartCount.textContent = totalItems;
        cartCount.style.display = totalItems > 0 ? 'block' : 'none';
    }
}

// Checkout
function checkout() {
    if (cart.length === 0) {
        showNotification('Your cart is empty!', 'error');
        return;
    }
    
    // In a real application, you would redirect to a checkout page
    showNotification('Proceeding to checkout...');
    
    // For demo purposes, we'll just clear the cart
    setTimeout(() => {
        clearCart();
        showNotification('Order placed successfully!');
    }, 2000);
}

// Load cart items when page loads
document.addEventListener('DOMContentLoaded', () => {
    loadCartItems();
    updateCartCount();
});

// Load and display cart items
function loadCartItems() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const container = document.getElementById('cartItems');
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const taxElement = document.getElementById('tax');
    const totalElement = document.getElementById('total');

    if (!container) return;

    if (cartItems.length === 0) {
        container.innerHTML = `
            <div class="empty-cart">
                <i class="fas fa-shopping-cart"></i>
                <h2>Your cart is empty</h2>
                <p>Looks like you haven't added any items to your cart yet.</p>
                <a href="shop.html" class="btn">Continue Shopping</a>
            </div>
        `;
        updateSummary(0, 0, 0);
        return;
    }

    // Get all products from all categories
    const allProducts = [
        ...products.men,
        ...products.women,
        ...products.kids,
        ...products.accessories,
        ...products.sale
    ];

    let subtotal = 0;
    container.innerHTML = cartItems.map(item => {
        const product = allProducts.find(p => p.id === item.id);
        if (!product) return '';

        const price = product.salePrice || product.price;
        const itemTotal = price * item.quantity;
        subtotal += itemTotal;

        return `
            <div class="cart-item" data-id="${product.id}">
                <img src="${product.image}" alt="${product.name}" class="cart-item-image">
                <div class="cart-item-details">
                    <h3 class="cart-item-title">${product.name}</h3>
                    <p class="cart-item-price">$${price.toFixed(2)}</p>
                    <div class="cart-item-quantity">
                        <button class="quantity-btn" onclick="updateQuantity(${product.id}, ${item.quantity - 1})">-</button>
                        <input type="number" class="quantity-input" value="${item.quantity}" min="1" 
                               onchange="updateQuantity(${product.id}, this.value)">
                        <button class="quantity-btn" onclick="updateQuantity(${product.id}, ${item.quantity + 1})">+</button>
                    </div>
                </div>
                <div class="cart-item-total">
                    <span>$${itemTotal.toFixed(2)}</span>
                    <button class="remove-item" onclick="removeFromCart(${product.id})">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
        `;
    }).join('');

    // Calculate shipping and tax
    const shipping = subtotal > 0 ? 5.99 : 0;
    const tax = subtotal * 0.08; // 8% tax

    // Update summary
    updateSummary(subtotal, shipping, tax);
}

// Update cart summary
function updateSummary(subtotal, shipping, tax) {
    const subtotalElement = document.getElementById('subtotal');
    const shippingElement = document.getElementById('shipping');
    const taxElement = document.getElementById('tax');
    const totalElement = document.getElementById('total');

    if (subtotalElement) subtotalElement.textContent = `$${subtotal.toFixed(2)}`;
    if (shippingElement) shippingElement.textContent = `$${shipping.toFixed(2)}`;
    if (taxElement) taxElement.textContent = `$${tax.toFixed(2)}`;
    if (totalElement) totalElement.textContent = `$${(subtotal + shipping + tax).toFixed(2)}`;
}

// Update quantity of an item
function updateQuantity(productId, newQuantity) {
    newQuantity = parseInt(newQuantity);
    if (newQuantity < 1) newQuantity = 1;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const itemIndex = cart.findIndex(item => item.id === productId);

    if (itemIndex !== -1) {
        cart[itemIndex].quantity = newQuantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        loadCartItems();
        updateCartCount();
    }
}

// Remove item from cart
function removeFromCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const updatedCart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    loadCartItems();
    updateCartCount();
    showNotification('Item removed from cart');
}

// Clear entire cart
function clearCart() {
    localStorage.removeItem('cart');
    loadCartItems();
    updateCartCount();
    showNotification('Cart cleared');
}

// Proceed to checkout
function checkout() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    if (cart.length === 0) {
        showNotification('Your cart is empty', 'error');
        return;
    }

    // In a real application, this would redirect to a payment gateway
    showNotification('Proceeding to checkout...');
    setTimeout(() => {
        clearCart();
        showNotification('Order placed successfully!');
    }, 2000);
} 