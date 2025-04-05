// Kids' products data
const kidsProducts = [
    {
        id: 9,
        name: "Nike Air Max 270 Kids",
        price: 80,
        image: "kids-air-max.jpg",
        category: "shoes",
        date: "2024-01-12"
    },
    {
        id: 10,
        name: "Nike Air Force 1 Kids",
        price: 70,
        image: "kids-air-force.jpg",
        category: "shoes",
        date: "2024-01-08"
    },
    {
        id: 11,
        name: "Nike Kids' T-Shirt",
        price: 20,
        image: "kids-tshirt.jpg",
        category: "clothing",
        date: "2024-01-15"
    },
    {
        id: 12,
        name: "Nike Kids' Shorts",
        price: 25,
        image: "kids-shorts.jpg",
        category: "clothing",
        date: "2024-01-20"
    }
];

// Load kids' products
document.addEventListener('DOMContentLoaded', () => {
    loadProducts('kids', 'kidsProducts');
    
    // Sort products
    const sortSelect = document.getElementById('sortSelect');
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            const sortedProducts = sortProducts('kids', sortSelect.value);
            const container = document.getElementById('kidsProducts');
            if (container) {
                container.innerHTML = sortedProducts.map(product => `
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
                        </div>
                    </div>
                `).join('');
            }
        });
    }
    
    // Filter products
    const filterSelect = document.getElementById('filterSelect');
    if (filterSelect) {
        filterSelect.addEventListener('change', () => {
            const filteredProducts = filterProducts('kids', filterSelect.value);
            const container = document.getElementById('kidsProducts');
            if (container) {
                container.innerHTML = filteredProducts.map(product => `
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
                        </div>
                    </div>
                `).join('');
            }
        });
    }
});

// Sort products
function sortProducts(category, sortBy) {
    let sortedProducts = [...kidsProducts];
    
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

    return sortedProducts;
}

// Filter products
function filterProducts(category, filterBy) {
    const filteredProducts = filterBy === 'all' 
        ? kidsProducts 
        : kidsProducts.filter(product => product.category === filterBy);

    return filteredProducts;
}

// Load products
function loadProducts(category, containerId) {
    const productGrid = document.getElementById(containerId);
    if (!productGrid) return;

    kidsProducts.forEach(product => {
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