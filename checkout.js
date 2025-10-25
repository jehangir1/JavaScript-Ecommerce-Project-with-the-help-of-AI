/* =============================
   CHECKOUT PAGE (checkout.html) LOGIC
   ============================= */
document.addEventListener('DOMContentLoaded', () => {
  const orderSummary = document.getElementById('order-summary');
  const totalAmount = document.getElementById('total-amount');
  const checkoutForm = document.getElementById('checkout-form');
  const successMessage = document.getElementById('success-message');

  // Function to display order summary
  function displayCheckoutSummary() {
    const cart = getCart();
    
    // If cart is empty, redirect to home
    if (cart.length === 0) {
      window.location.href = 'index.html';
      return;
    }

    orderSummary.innerHTML = ''; // Clear summary

    cart.forEach(item => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between';
      li.textContent = `${item.title} (x${item.quantity})`;
      
      const span = document.createElement('span');
      span.className = 'fw-bold';
      span.textContent = `$${(item.price * item.quantity).toFixed(2)}`;
      
      li.appendChild(span);
      orderSummary.appendChild(li);
    });

    // Display total
    const total = getCartTotal();
    totalAmount.textContent = `Total: $${total.toFixed(2)}`;
  }

  // Handle form submission
  checkoutForm.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent actual form submission

    // Basic validation check (just to ensure form isn't submitted empty)
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    if (!name || !email) {
      alert('Please fill out all required fields.');
      return;
    }

    // 1. Show success message
    successMessage.style.display = 'block';
    
    // 2. Hide the form and summary
    checkoutForm.style.display = 'none';
    document.querySelector('.col-lg-5').style.display = 'none';

    // 3. Clear the cart
    clearCart();

    // 4. Update the nav (should be 0 now)
    updateCartCountNav();

    // 5. Redirect to home page after 3 seconds
    setTimeout(() => {
      window.location.href = 'index.html';
    }, 3000);
  });

  // Initial display
  displayCheckoutSummary();
});