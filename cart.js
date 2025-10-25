/* =============================
   CART MANAGEMENT (localStorage)
   ============================= */
// This file should be included in all HTML pages.

/**
 * Retrieves the cart from localStorage.
 * @returns {Array} The cart, or an empty array if it doesn't exist.
 */
function getCart() {
  return JSON.parse(localStorage.getItem('cart')) || [];
}

/**
 * Saves the cart to localStorage.
 * @param {Array} cart - The cart array to save.
 */
function saveCart(cart) {
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCountNav(); // Update nav count every time cart is saved
}

/**
 * Adds a product to the cart or increments its quantity.
 * @param {string} productId - The ID of the product.
 * @param {object} product - The product object (must have id, title, price, image).
 */
function addToCart(productId, product) {
  const cart = getCart();
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  saveCart(cart);
  // Optionally, show a success message
  alert(`${product.title} has been added to your cart!`);
}

/**
 * Updates the quantity of a specific item in the cart.
 * If quantity reaches 0, the item is removed.
 * @param {string} productId - The ID of the product to update.
 * @param {number} newQuantity - The new quantity.
 */
function updateQuantity(productId, newQuantity) {
  let cart = getCart();
  const item = cart.find(item => item.id === productId);

  if (item) {
    if (newQuantity > 0) {
      item.quantity = newQuantity;
    } else {
      // Remove item if quantity is 0 or less
      cart = cart.filter(item => item.id !== productId);
    }
    saveCart(cart);
  }
}

/**
 * Removes an item from the cart completely.
 * @param {string} productId - The ID of the product to remove.
 */
function removeFromCart(productId) {
  let cart = getCart();
  cart = cart.filter(item => item.id !== productId);
  saveCart(cart);
}

/**
 * Calculates the total price of all items in the cart.
 * @returns {number} The total price.
 */
function getCartTotal() {
  const cart = getCart();
  return cart.reduce((total, item) => total + item.price * item.quantity, 0);
}

/**
 * Clears all items from the cart.
 */
function clearCart() {
  localStorage.removeItem('cart');
  updateCartCountNav();
}

/**
 * Updates the cart count indicator in the navigation bar.
 * Assumes an element with id="cart-count" exists.
 */
function updateCartCountNav() {
  const cart = getCart();
  const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountElement = document.getElementById('cart-count');
  
  if (cartCountElement) {
    cartCountElement.textContent = totalQuantity;
  }
}

// Update cart count on initial page load (for all pages)
document.addEventListener('DOMContentLoaded', updateCartCountNav);