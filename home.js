/* =============================
   HOME PAGE (index.html) LOGIC
   ============================= */
document.addEventListener('DOMContentLoaded', () => {
  const productGrid = document.getElementById('product-grid');
  const loader = document.getElementById('loader');
  const priceFilter = document.getElementById('price-filter');
  const priceValue = document.getElementById('price-value');

  let allProducts = []; // To store all fetched products

  // Fetch products from API
  async function fetchProducts() {
    try {
      loader.style.display = 'block'; // Show loader
      const response = await fetch('https://fakestoreapi.com/products');
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      allProducts = await response.json();
      displayProducts(allProducts); // Display all products initially
    } catch (error) {
      console.error("Failed to fetch products:", error);
      productGrid.innerHTML = `<div class="col-12"><p class="text-center text-danger">Failed to load products. Please try again later.</p></div>`;
    } finally {
      loader.style.display = 'none'; // Hide loader
    }
  }

  // Display products in the grid
  function displayProducts(products) {
    productGrid.innerHTML = ''; // Clear existing products
    if (products.length === 0) {
      productGrid.innerHTML = `<div class="col-12"><p class="text-center">No products found matching your filter.</p></div>`;
      return;
    }

    products.forEach(product => {
      const productCard = `
        <div class="col-lg-3 col-md-4 col-sm-6 mb-4">
          <div class="card product-card shadow-sm">
            <img src="${product.image}" class="card-img-top" alt="${product.title}">
            <div class="card-body">
              <h5 class="card-title">${product.title.substring(0, 50)}...</h5>
              <p class="card-text">$${product.price.toFixed(2)}</p>
              <button class="btn btn-primary mt-auto add-to-cart-btn" 
                data-id="${product.id}" 
                data-title="${product.title}" 
                data-price="${product.price}" 
                data-image="${product.image}">
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      `;
      productGrid.innerHTML += productCard;
    });
  }

  // Filter products based on the price slider
  function filterProducts() {
    const maxPrice = parseFloat(priceFilter.value);
    priceValue.textContent = `$${maxPrice}`;
    
    const filteredProducts = allProducts.filter(product => product.price <= maxPrice);
    displayProducts(filteredProducts);
  }

  // Event Listeners
  priceFilter.addEventListener('input', filterProducts);

  // Event Delegation for "Add to Cart" buttons
  productGrid.addEventListener('click', (e) => {
    if (e.target.classList.contains('add-to-cart-btn')) {
      const button = e.target;
      const product = {
        id: parseInt(button.dataset.id), // Ensure ID is a number if API gives string
        title: button.dataset.title,
        price: parseFloat(button.dataset.price),
        image: button.dataset.image
      };
      
      addToCart(product.id, product);
    }
  });

  // Initial fetch
  fetchProducts();
});