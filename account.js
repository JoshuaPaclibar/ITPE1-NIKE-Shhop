// User data
let userData = JSON.parse(localStorage.getItem('userData')) || {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    orders: [],
    wishlist: []
};

// Sample order data
const sampleOrders = [
    {
        id: 'ORD001',
        date: '2024-03-15',
        items: ['Nike Air Max 270', 'Nike Dri-FIT T-Shirt'],
        total: 180,
        status: 'Delivered'
    },
    {
        id: 'ORD002',
        date: '2024-03-10',
        items: ['Nike Air Force 1'],
        total: 110,
        status: 'Processing'
    }
];

// Load user profile
function loadProfile() {
    document.getElementById('firstName').value = userData.firstName;
    document.getElementById('lastName').value = userData.lastName;
    document.getElementById('email').value = userData.email;
    document.getElementById('phone').value = userData.phone;
}

// Update user profile
function updateProfile() {
    userData.firstName = document.getElementById('firstName').value;
    userData.lastName = document.getElementById('lastName').value;
    userData.email = document.getElementById('email').value;
    userData.phone = document.getElementById('phone').value;
    
    localStorage.setItem('userData', JSON.stringify(userData));
    showNotification('Profile updated successfully!');
}

// Load order history
function loadOrderHistory() {
    const orderHistory = document.getElementById('orderHistory');
    if (!orderHistory) return;
    
    const orders = userData.orders.length > 0 ? userData.orders : sampleOrders;
    
    orderHistory.innerHTML = orders.map(order => `
        <tr>
            <td>${order.id}</td>
            <td>${order.date}</td>
            <td>${order.items.join(', ')}</td>
            <td>$${order.total}</td>
            <td>${order.status}</td>
        </tr>
    `).join('');
}

// Load wishlist
function loadWishlist() {
    const wishlistItems = document.getElementById('wishlistItems');
    if (!wishlistItems) return;
    
    if (userData.wishlist.length === 0) {
        wishlistItems.innerHTML = '<p>Your wishlist is empty</p>';
        return;
    }
    
    // Get all products from different categories
    const allProducts = [
        ...products,
        ...menProducts,
        ...womenProducts,
        ...kidsProducts,
        ...accessoriesProducts,
        ...saleProducts
    ];
    
    const wishlistProducts = allProducts.filter(product => 
        userData.wishlist.includes(product.id)
    );
    
    wishlistItems.innerHTML = wishlistProducts.map(product => `
        <div class="product-card">
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">
                    ${product.salePrice ? `
                        <span class="original-price">$${product.originalPrice}</span>
                        <span class="sale-price">$${product.salePrice}</span>
                        <span class="discount">(${product.discount}% off)</span>
                    ` : `
                        <span>$${product.price}</span>
                    `}
                </p>
                <button onclick="addToCart(${product.id})" class="btn">Add to Cart</button>
                <button onclick="removeFromWishlist(${product.id})" class="btn btn-secondary">Remove</button>
            </div>
        </div>
    `).join('');
}

// Add to wishlist
function addToWishlist(productId) {
    if (!userData.wishlist.includes(productId)) {
        userData.wishlist.push(productId);
        localStorage.setItem('userData', JSON.stringify(userData));
        showNotification('Product added to wishlist!');
    }
}

// Remove from wishlist
function removeFromWishlist(productId) {
    userData.wishlist = userData.wishlist.filter(id => id !== productId);
    localStorage.setItem('userData', JSON.stringify(userData));
    loadWishlist();
    showNotification('Product removed from wishlist!');
}

// Update password
function updatePassword() {
    const currentPassword = document.getElementById('currentPassword').value;
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;
    
    if (newPassword !== confirmPassword) {
        showNotification('New passwords do not match!', 'error');
        return;
    }
    
    // In a real application, you would verify the current password with the server
    showNotification('Password updated successfully!');
    
    // Clear password fields
    document.getElementById('currentPassword').value = '';
    document.getElementById('newPassword').value = '';
    document.getElementById('confirmPassword').value = '';
}

// Tab switching functionality
document.addEventListener('DOMContentLoaded', () => {
    // Load initial data
    loadProfile();
    loadOrderHistory();
    loadWishlist();
    
    // Tab switching
    const tabs = document.querySelectorAll('.account-tab');
    tabs.forEach(tab => {
        tab.addEventListener('click', () => {
            // Remove active class from all tabs and contents
            tabs.forEach(t => t.classList.remove('active'));
            document.querySelectorAll('.account-content').forEach(content => 
                content.classList.remove('active')
            );
            
            // Add active class to clicked tab and corresponding content
            tab.classList.add('active');
            const tabId = tab.getAttribute('data-tab');
            document.getElementById(tabId).classList.add('active');
        });
    });
}); 