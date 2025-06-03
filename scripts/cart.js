document.addEventListener("DOMContentLoaded", () => {
  // Redirect to login page if not logged in
  const isLoggedIn = localStorage.getItem("isLoggedIn");
  if (isLoggedIn !== "true") {
    localStorage.setItem("redirectAfterLogin", "cart.html");
    window.location.href = "login-signup.html";
    return;
  }

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
    checkoutBtn.addEventListener("click", (e) => {
      const cart = getCart();
      if (cart.length === 0) {
        e.preventDefault();
        alert("Your cart is empty. Please add items before proceeding to checkout.");
        return;
      }

      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (!isLoggedIn) {
        localStorage.setItem("redirectAfterLogin", "checkout.html");
        window.location.href = "login-signup.html";
        return;
      }

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

  cartItemsContainer.innerHTML = "";

  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    totalPriceElement.textContent = "0.00";
    return;
  }

  let totalPrice = 0;
  const fragment = document.createDocumentFragment();

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

// Handle remove & quantity change
function setupRemoveHandlers() {
  document.addEventListener("click", (event) => {
    const cart = getCart();

    if (event.target.classList.contains("remove-btn")) {
      const productId = event.target.getAttribute("data-id");
      const updatedCart = cart.filter((item) => item.id !== productId);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      renderCartItems();
      updateCartCount();
      toggleCheckoutButton();
    }

    if (
      event.target.classList.contains("increase-btn") ||
      event.target.classList.contains("decrease-btn")
    ) {
      const productId = event.target.getAttribute("data-id");
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

// Update cart count in navbar
function updateCartCount() {
  const cartCountElement = document.getElementById("cart-count");
  const cart = getCart();
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  if (cartCountElement) {
    cartCountElement.textContent = totalCount;
  }
}

// Enable/Disable checkout button
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
