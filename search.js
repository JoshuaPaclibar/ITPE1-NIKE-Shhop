// Combine all products
const allProducts = [
    ...products,
    ...menProducts,
    ...womenProducts,
    ...kidsProducts,
    ...accessoriesProducts,
    ...saleProducts
];

// Search products
function searchProducts() {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');
    const searchResults = document.getElementById('searchResults');
    
    if (!searchInput || !categoryFilter || !priceFilter || !searchResults) return;
    
    const searchTerm = searchInput.value.toLowerCase();
    const category = categoryFilter.value;
    const priceRange = priceFilter.value;
    
    let filteredProducts = allProducts.filter(product => {
        // Search term filter
        const matchesSearch = product.name.toLowerCase().includes(searchTerm);
        
        // Category filter
        const matchesCategory = category === 'all' || product.category === category;
        
        // Price range filter
        let matchesPrice = true;
        if (priceRange !== 'all') {
            const [min, max] = priceRange.split('-').map(Number);
            const price = product.salePrice || product.price;
            
            if (priceRange === '150+') {
                matchesPrice = price >= 150;
            } else {
                matchesPrice = price >= min && price <= max;
            }
        }
        
        return matchesSearch && matchesCategory && matchesPrice;
    });
    
    displaySearchResults(filteredProducts);
}

// Display search results
function displaySearchResults(results) {
    const searchResults = document.getElementById('searchResults');
    if (!searchResults) return;
    
    if (results.length === 0) {
        searchResults.innerHTML = `
            <div class="no-results">
                <h2>No products found</h2>
                <p>Try adjusting your search or filters</p>
            </div>
        `;
        return;
    }
    
    searchResults.innerHTML = `
        <div class="product-grid">
            ${results.map(product => `
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
            `).join('')}
        </div>
    `;
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.getElementById('searchInput');
    const categoryFilter = document.getElementById('categoryFilter');
    const priceFilter = document.getElementById('priceFilter');
    
    if (searchInput) {
        searchInput.addEventListener('keyup', (e) => {
            if (e.key === 'Enter') {
                searchProducts();
            }
        });
    }
    
    if (categoryFilter) {
        categoryFilter.addEventListener('change', searchProducts);
    }
    
    if (priceFilter) {
        priceFilter.addEventListener('change', searchProducts);
    }
}); 