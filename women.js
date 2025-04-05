// Women's products data
const womenProducts = [
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
];

// Load women's products
function loadWomenProducts() {
    const productGrid = document.getElementById('womenProducts');
    if (!productGrid) return;

    womenProducts.forEach(product => {
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
    const productGrid = document.getElementById('womenProducts');
    if (!productGrid) return;

    let sortedProducts = [...womenProducts];
    
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
    const productGrid = document.getElementById('womenProducts');
    if (!productGrid) return;

    const filteredProducts = category === 'all' 
        ? womenProducts 
        : womenProducts.filter(product => product.category === category);

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
    loadProducts('women', 'womenProducts');
    
    const sortSelect = document.getElementById('sortSelect');
    const filterSelect = document.getElementById('filterSelect');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            const sortedProducts = sortProducts('women', sortSelect.value);
            loadProducts('women', 'womenProducts', sortedProducts);
        });
    }
    
    if (filterSelect) {
        filterSelect.addEventListener('change', () => {
            const filteredProducts = filterProducts('women', filterSelect.value);
            loadProducts('women', 'womenProducts', filteredProducts);
        });
    }
}); 