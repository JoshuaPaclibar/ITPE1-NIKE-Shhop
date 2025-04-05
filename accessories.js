// Accessories data
const accessoriesProducts = [
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
];

// Load accessories products
function loadAccessoriesProducts() {
    const productGrid = document.getElementById('accessoriesProducts');
    if (!productGrid) return;

    accessoriesProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price}</p>
                <button onclick="addToCart(${product.id})" class="btn">Add to Cart</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

// Sort products
function sortProducts(sortBy) {
    const productGrid = document.getElementById('accessoriesProducts');
    if (!productGrid) return;

    let sortedProducts = [...accessoriesProducts];
    
    switch(sortBy) {
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

    productGrid.innerHTML = '';
    sortedProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price}</p>
                <button onclick="addToCart(${product.id})" class="btn">Add to Cart</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

// Filter products
function filterProducts(category) {
    const productGrid = document.getElementById('accessoriesProducts');
    if (!productGrid) return;

    const filteredProducts = category === 'all' 
        ? accessoriesProducts 
        : accessoriesProducts.filter(product => product.category === category);

    productGrid.innerHTML = '';
    filteredProducts.forEach(product => {
        const productCard = document.createElement('div');
        productCard.className = 'product-card';
        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.name}" class="product-image">
            <div class="product-info">
                <h3 class="product-title">${product.name}</h3>
                <p class="product-price">$${product.price}</p>
                <button onclick="addToCart(${product.id})" class="btn">Add to Cart</button>
            </div>
        `;
        productGrid.appendChild(productCard);
    });
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    loadProducts('accessories', 'accessoriesProducts');
    
    const sortSelect = document.getElementById('sortSelect');
    const filterSelect = document.getElementById('filterSelect');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            const sortedProducts = sortProducts('accessories', sortSelect.value);
            loadProducts('accessories', 'accessoriesProducts', sortedProducts);
        });
    }
    
    if (filterSelect) {
        filterSelect.addEventListener('change', () => {
            const filteredProducts = filterProducts('accessories', filterSelect.value);
            loadProducts('accessories', 'accessoriesProducts', filteredProducts);
        });
    }
}); 