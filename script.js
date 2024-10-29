const productContainer = document.getElementById('product-container');
const priceFilter = document.getElementById('priceFilter');

async function fetchProducts() {
    try {
        const response = await fetch('https://fakestoreapi.com/products');
        const products = await response.json();
        displayProducts(products);

        priceFilter.addEventListener('change', () => filterProducts(products));
    } catch (error) {
        console.error('Error fetching products:', error);
    }
}

function displayProducts(products) {
    productContainer.innerHTML = ''; 

    products.forEach(product => {
        const div = document.createElement('div');
        div.className = 'product';

        div.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p>${product.description}</p>
            <p class="price">$${product.price}</p>
        `;

        productContainer.appendChild(div);
    });
}

function filterProducts(products) {
    const selectedRange = priceFilter.value;
    console.log("Selected Range:", selectedRange);

    let filteredProducts = [];

    if (selectedRange === '0-50') {
        filteredProducts = products.filter(product => product.price < 50);
    } else if (selectedRange === '50-100') {
        filteredProducts = products.filter(product => product.price > 50 && product.price <= 100);
    } else if (selectedRange === '100-') {
        filteredProducts = products.filter(product => product.price > 100);
    } else {
        filteredProducts = products;
    }

    displayProducts(filteredProducts);
}
fetchProducts();
