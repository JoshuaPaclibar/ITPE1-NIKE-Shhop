// All product data
const products = {
    men: [
        {
            id: 1,
            name: "Nike Air Max 270",
            price: 150,
            image: "air-max-270.jpg",
            category: "shoes",
            date: "2024-01-15"
        },
        {
            id: 3,
            name: "Nike React Infinity Run",
            price: 160,
            image: "react-infinity.jpg",
            category: "shoes",
            date: "2024-02-01"
        },
        {
            id: 5,
            name: "Nike Dri-FIT T-Shirt",
            price: 30,
            image: "dri-fit-tshirt.jpg",
            category: "clothing",
            date: "2024-01-20"
        },
        {
            id: 6,
            name: "Nike Sportswear Club Fleece",
            price: 55,
            image: "club-fleece.jpg",
            category: "clothing",
            date: "2024-01-25"
        }
    ],
    women: [
        {
            id: 2,
            name: "Nike Air Force 1",
            price: 110,
            image: "air-force-1.jpg",
            category: "shoes",
            date: "2024-01-10"
        },
        {
            id: 4,
            name: "Nike Air Zoom Pegasus",
            price: 120,
            image: "pegasus.jpg",
            category: "shoes",
            date: "2024-01-05"
        },
        {
            id: 7,
            name: "Nike Sportswear Essential",
            price: 35,
            image: "essential-tshirt.jpg",
            category: "clothing",
            date: "2024-01-18"
        },
        {
            id: 8,
            name: "Nike Yoga Dri-FIT",
            price: 45,
            image: "yoga-leggings.jpg",
            category: "clothing",
            date: "2024-01-22"
        }
    ],
    kids: [
        {
            id: 9,
            name: "Nike Air Max 270 Kids",
            price: 100,
            image: "kids-air-max.jpg",
            category: "shoes",
            date: "2024-01-12"
        },
        {
            id: 10,
            name: "Nike Air Force 1 Kids",
            price: 80,
            image: "kids-air-force.jpg",
            category: "shoes",
            date: "2024-01-08"
        },
        {
            id: 11,
            name: "Nike Kids' T-Shirt",
            price: 25,
            image: "kids-tshirt.jpg",
            category: "clothing",
            date: "2024-01-15"
        },
        {
            id: 12,
            name: "Nike Kids' Shorts",
            price: 30,
            image: "kids-shorts.jpg",
            category: "clothing",
            date: "2024-01-20"
        }
    ],
    accessories: [
        {
            id: 13,
            name: "Nike Heritage Backpack",
            price: 45,
            image: "backpack.jpg",
            category: "bags",
            date: "2024-01-10"
        },
        {
            id: 14,
            name: "Nike Sportswear Cap",
            price: 25,
            image: "cap.jpg",
            category: "hats",
            date: "2024-01-15"
        },
        {
            id: 15,
            name: "Nike Everyday Cushioned Socks",
            price: 15,
            image: "socks.jpg",
            category: "socks",
            date: "2024-01-20"
        },
        {
            id: 16,
            name: "Nike Dri-FIT Headband",
            price: 12,
            image: "headband.jpg",
            category: "other",
            date: "2024-01-25"
        }
    ]
};

// Cart functionality
function addToCart(productId) {
    // Get all products from different categories
    const allProducts = [
        ...products.men,
        ...products.women,
        ...products.kids,
        ...products.accessories
    ];
    
    const product = allProducts.find(p => p.id === productId);
    if (!product) return;

    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity += 1;
    } else {
        cart.push({
            id: product.id,
            name: product.name,
            price: product.price,
            image: product.image,
            quantity: 1
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    showNotification('Item added to cart');
}

// Load products for a specific category
function loadProducts(type, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const productList = products[type];
    if (!productList) return;

    container.innerHTML = productList.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price}</p>
                <button onclick="addToCart(${product.id})" class="btn">Add to Cart</button>
            </div>
        </div>
    `).join('');
}

// Sort products
function sortProducts(category, sortBy) {
    const sortedProducts = [...products[category]];
    
    switch (sortBy) {
        case 'price-low':
            sortedProducts.sort((a, b) => a.price - b.price);
            break;
        case 'price-high':
            sortedProducts.sort((a, b) => b.price - a.price);
            break;
        case 'newest':
            sortedProducts.sort((a, b) => new Date(b.date) - new Date(a.date));
            break;
    }
    
    return sortedProducts;
}

// Filter products
function filterProducts(category, filterBy) {
    if (filterBy === 'all') return products[category];
    return products[category].filter(product => product.category === filterBy);
}

// Notification system
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);

    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 3000);
}

// Update cart count in header
function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);
    const cartCountElement = document.getElementById('cartCount');
    if (cartCountElement) {
        cartCountElement.textContent = cartCount;
        cartCountElement.style.display = cartCount > 0 ? 'block' : 'none';
    }
}

// Load cart items
function loadCartItems() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartItemsContainer = document.getElementById('cartItems');
    const cartTotal = document.getElementById('cartTotal');
    
    if (!cartItemsContainer) return;

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        if (cartTotal) cartTotal.textContent = '$0.00';
        return;
    }

    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const shipping = subtotal > 0 ? 5.99 : 0;
    const tax = subtotal * 0.1; // 10% tax
    const total = subtotal + shipping + tax;

    cartItemsContainer.innerHTML = cart.map(item => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" class="cart-item-image">
            <div class="cart-item-details">
                <h3>${item.name}</h3>
                <p>$${item.price.toFixed(2)}</p>
                <div class="quantity-controls">
                    <button onclick="updateQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span>${item.quantity}</span>
                    <button onclick="updateQuantity(${item.id}, ${item.quantity + 1})">+</button>
                </div>
                <button onclick="removeFromCart(${item.id})" class="remove-btn">Remove</button>
            </div>
        </div>
    `).join('');

    if (cartTotal) {
        cartTotal.innerHTML = `
            <div class="cart-summary">
                <p>Subtotal: $${subtotal.toFixed(2)}</p>
                <p>Shipping: $${shipping.toFixed(2)}</p>
                <p>Tax: $${tax.toFixed(2)}</p>
                <p class="total">Total: $${total.toFixed(2)}</p>
            </div>
        `;
    }
}

// Update quantity
function updateQuantity(productId, newQuantity) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const item = cart.find(item => item.id === productId);
    
    if (item) {
        if (newQuantity <= 0) {
            removeFromCart(productId);
        } else {
            item.quantity = newQuantity;
            localStorage.setItem('cart', JSON.stringify(cart));
            loadCartItems();
            updateCartCount();
        }
    }
}

// Remove from cart
function removeFromCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const newCart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(newCart));
    loadCartItems();
    updateCartCount();
    showNotification('Item removed from cart');
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    updateCartCount();
});

// Add notification styles
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: 20px;
        right: 20px;
        background-color: #007bff;
        color: white;
        padding: 1rem;
        border-radius: 5px;
        animation: fadeInOut 3s ease-in-out;
    }

    @keyframes fadeInOut {
        0% { opacity: 0; }
        10% { opacity: 1; }
        90% { opacity: 1; }
        100% { opacity: 0; }
    }

    .fa-shopping-cart[data-count]:after {
        content: attr(data-count);
        position: absolute;
        top: -10px;
        right: -10px;
        background: red;
        color: white;
        border-radius: 50%;
        padding: 0.2rem 0.5rem;
        font-size: 0.8rem;
    }
`;
document.head.appendChild(style); 