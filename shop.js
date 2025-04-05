// Load all products from different categories
function loadAllProducts() {
    const productGrid = document.getElementById('allProducts');
    if (!productGrid) return;

    const allProducts = [
        ...products.men,
        ...products.women,
        ...products.kids,
        ...products.accessories
    ];

    allProducts.forEach(product => {
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
    const productGrid = document.getElementById('allProducts');
    if (!productGrid) return;

    const allProducts = [
        ...products.men,
        ...products.women,
        ...products.kids,
        ...products.accessories
    ];

    let sortedProducts = [...allProducts];
    
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

// Filter products by category
function filterByCategory(category) {
    const productGrid = document.getElementById('allProducts');
    if (!productGrid) return;

    const allProducts = [
        ...products.men,
        ...products.women,
        ...products.kids,
        ...products.accessories
    ];

    const filteredProducts = category === 'all' 
        ? allProducts 
        : category === 'men' ? products.men
        : category === 'women' ? products.women
        : category === 'kids' ? products.kids
        : products.accessories;

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

// Filter products by type
function filterByType(type) {
    const productGrid = document.getElementById('allProducts');
    if (!productGrid) return;

    const allProducts = [
        ...products.men,
        ...products.women,
        ...products.kids,
        ...products.accessories
    ];

    const filteredProducts = type === 'all'
        ? allProducts
        : allProducts.filter(product => product.category === type);

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
    loadAllProducts();
    
    const sortSelect = document.getElementById('sortBy');
    const categorySelect = document.getElementById('filterBy');
    const typeSelect = document.getElementById('typeBy');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            sortProducts(sortSelect.value);
        });
    }
    
    if (categorySelect) {
        categorySelect.addEventListener('change', () => {
            filterByCategory(categorySelect.value);
        });
    }

    if (typeSelect) {
        typeSelect.addEventListener('change', () => {
            filterByType(typeSelect.value);
        });
    }
}); 