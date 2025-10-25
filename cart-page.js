/* =============================
   CART PAGE (cart.html) LOGIC
   ============================= */
document.addEventListener('DOMContentLoaded', () => {
  const cartItemsContainer = document.getElementById('cart-items-container');
  const cartSummary = document.getElementById('cart-summary');
  const checkoutBtn = document.getElementById('checkout-btn');

  function displayCartItems() {
    const cart = getCart();
    cartItemsContainer.innerHTML = ''; // Clear old items

    if (cart.length === 0) {
      cartItemsContainer.innerHTML = '<p class="text-center">Your cart is empty. <a href="index.html">Go shopping!</a></p>';
      cartSummary.innerHTML = '<h5>Total: $0.00</h5>';
      checkoutBtn.classList.add('disabled');
      return;
    }

    checkoutBtn.classList.remove('disabled');
    let listGroup = document.createElement('ul');
    listGroup.className = 'list-group';

    cart.forEach(item => {
      const itemElement = document.createElement('li');
      itemElement.className = 'list-group-item d-flex justify-content-between align-items-center flex-wrap';
      
      itemElement.innerHTML = `
        <div class="d-flex align-items-center my-2">
          <img src="${item.image}" alt="${item.title}" class="cart-item-img">
          <div>
            <strong>${item.title}</strong>
            <br>
            <small>$${item.price.toFixed(2)}</small>
          </div>
        </div>
        <div class="d-flex align-items-center my-2">
          <button class="btn btn-sm btn-secondary me-2 cart-action-btn" data-id="${item.id}" data-action="decrease">-</button>
          <span>${item.quantity}</span>
          <button class="btn btn-sm btn-secondary ms-2 cart-action-btn" data-id="${item.id}" data-action="increase">+</button>
          <button class="btn btn-sm btn-danger ms-3 cart-action-btn" data-id="${item.id}" data-action="delete">
            Delete
          </button>
        </div>
      `;
      listGroup.appendChild(itemElement);
    });

    cartItemsContainer.appendChild(listGroup);

    // Update summary
    const total = getCartTotal();
    cartSummary.innerHTML = `<h5>Total: $${total.toFixed(2)}</h5>`;
  }

  // Event Delegation for cart actions (+, -, delete)
  cartItemsContainer.addEventListener('click', (e) => {
    if (!e.target.classList.contains('cart-action-btn')) {
      return;
    }

    const target = e.target;
    const id = parseInt(target.dataset.id);
    const action = target.dataset.action;
    const cart = getCart();
    const item = cart.find(i => i.id === id);

    if (!item) return;

    if (action === 'increase') {
      updateQuantity(id, item.quantity + 1);
    } else if (action === 'decrease') {
      updateQuantity(id, item.quantity - 1); // cart.js handles removal at 0
    } else if (action === 'delete') {
      removeFromCart(id);
    }

    // Re-render the cart and update nav
    displayCartItems();
    updateCartCountNav();
  });

  // Initial render
  displayCartItems();
});