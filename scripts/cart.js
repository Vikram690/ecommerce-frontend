document.addEventListener("DOMContentLoaded", () => {
  renderCartItems();
  setupRemoveHandlers();
  updateCartCount();
  toggleCheckoutButton();

  // Clear Cart Button Logic
  const clearCartBtn = document.getElementById("clear-cart-btn");
  if (clearCartBtn) {
    clearCartBtn.addEventListener("click", () => {
      localStorage.removeItem("cart");
      renderCartItems();
      updateCartCount();
      toggleCheckoutButton();
    });
  }

  // Checkout Button Redirect
  const checkoutBtn = document.getElementById("checkout-btn");
  if (checkoutBtn) {
    checkoutBtn.addEventListener("click", () => {
      window.location.href = "checkout.html";
    });
  }
});

// Get cart data from localStorage
function getCart() {
  try {
    return JSON.parse(localStorage.getItem("cart")) || [];
  } catch (e) {
    console.error("Failed to parse cart from localStorage", e);
    // Reset cart if data is corrupted
    localStorage.setItem("cart", JSON.stringify([]));
    return [];
  }
}

// Render cart items dynamically
function renderCartItems() {
  const cartItemsContainer = document.getElementById("cart-items");
  const totalPriceElement = document.getElementById("total-price");
  const cart = getCart();

  if (!cartItemsContainer || !totalPriceElement) return;

  cartItemsContainer.innerHTML = ""; // Clear previous content

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalPriceElement.textContent = "0.00";
    return;
  }

  let totalPrice = 0;
  const fragment = document.createDocumentFragment(); // For better performance

  cart.forEach((item) => {
    const itemPriceNumber = parseFloat(item.price.replace("₹", "").trim());
    const itemTotal = itemPriceNumber * item.quantity;
    totalPrice += itemTotal;

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");

    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}" width="100">
      <div>
        <h3>${item.name}</h3>
        <p>₹${item.price} x ${item.quantity}</p>
        <p>Total: ₹${itemTotal.toFixed(2)}</p>
        <div class="quantity-controls">
          <button class="decrease-btn" data-id="${item.id}">-</button>
          <input type="number" class="quantity-input" value="${item.quantity}" min="1" data-id="${item.id}">
          <button class="increase-btn" data-id="${item.id}">+</button>
        </div>
        <button class="remove-btn" data-id="${item.id}">Remove</button>
      </div>
    `;

    fragment.appendChild(itemDiv);
  });

  cartItemsContainer.appendChild(fragment);
  totalPriceElement.textContent = totalPrice.toFixed(2);
}

// Setup handlers for removing items and updating quantity
function setupRemoveHandlers() {
  document.addEventListener("click", (event) => {
    if (event.target.classList.contains("remove-btn")) {
      const productId = event.target.getAttribute("data-id");
      let cart = getCart();
      cart = cart.filter((item) => item.id !== productId); // Remove item by ID
      localStorage.setItem("cart", JSON.stringify(cart));
      renderCartItems();
      updateCartCount();
      toggleCheckoutButton();
    }

    // Handling quantity update (increase/decrease)
    if (
      event.target.classList.contains("increase-btn") ||
      event.target.classList.contains("decrease-btn")
    ) {
      const productId = event.target.getAttribute("data-id");
      let cart = getCart();
      const item = cart.find((item) => item.id === productId);

      if (item) {
        const quantityInput = document.querySelector(`input[data-id="${productId}"]`);
        let newQuantity = parseInt(quantityInput.value);

        if (event.target.classList.contains("increase-btn")) {
          newQuantity++;
        } else if (
          event.target.classList.contains("decrease-btn") &&
          newQuantity > 1
        ) {
          newQuantity--;
        }

        item.quantity = newQuantity;
        localStorage.setItem("cart", JSON.stringify(cart));
        renderCartItems();
        updateCartCount();
        toggleCheckoutButton();
      }
    }
  });
}

// Update the cart count in the navigation bar
function updateCartCount() {
  const cartCountElement = document.getElementById("cart-count");
  const cart = getCart();
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cartCountElement) {
    cartCountElement.textContent = totalCount;
  }
}

// Enable/Disable checkout button depending on cart emptiness
function toggleCheckoutButton() {
  const checkoutBtn = document.getElementById("checkout-btn");
  const cart = getCart();

  if (!checkoutBtn) return;

  if (cart.length === 0) {
    checkoutBtn.disabled = true;
    checkoutBtn.style.opacity = "0.6";
    checkoutBtn.style.cursor = "not-allowed";
  } else {
    checkoutBtn.disabled = false;
    checkoutBtn.style.opacity = "1";
    checkoutBtn.style.cursor = "pointer";
  }
}