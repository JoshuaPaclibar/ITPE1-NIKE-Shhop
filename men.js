// Men's products data
const menProducts = [
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
];

// Load men's products
function loadMenProducts() {
    const productGrid = document.getElementById('menProducts');
    if (!productGrid) return;

    menProducts.forEach(product => {
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
    const productGrid = document.getElementById('menProducts');
    if (!productGrid) return;

    let sortedProducts = [...menProducts];
    
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
    const productGrid = document.getElementById('menProducts');
    if (!productGrid) return;

    const filteredProducts = category === 'all' 
        ? menProducts 
        : menProducts.filter(product => product.category === category);

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
    loadMenProducts();
    
    const sortSelect = document.getElementById('sortBy');
    const filterSelect = document.getElementById('filterBy');
    
    if (sortSelect) {
        sortSelect.addEventListener('change', () => {
            sortProducts(sortSelect.value);
        });
    }
    
    if (filterSelect) {
        filterSelect.addEventListener('change', () => {
            filterProducts(filterSelect.value);
        });
    }
});