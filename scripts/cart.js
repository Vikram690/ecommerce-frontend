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
    checkoutBtn.addEventListener("click", (e) => {
      const cart = getCart();
      if (cart.length === 0) {
        e.preventDefault();
        alert("Your cart is empty. Please add items before proceeding to checkout.");
        return;
      }

      showConfirmation("Proceeding to checkout...");
      window.location.href = "checkout.html";
    });
  }
});

// Get cart from localStorage
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
    const itemPriceNumber = typeof item.price === "string" ? parseFloat(item.price.replace("₹", "").trim()) : item.price;
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

// Setup quantity and remove handlers
function setupRemoveHandlers() {
  document.addEventListener("click", (event) => {
    const cart = getCart();

    // Remove item
    if (event.target.classList.contains("remove-btn")) {
      const productId = parseInt(event.target.getAttribute("data-id"));
      const updatedCart = cart.filter((item) => item.id !== productId);
      localStorage.setItem("cart", JSON.stringify(updatedCart));
      renderCartItems();
      updateCartCount();
      toggleCheckoutButton();
    }

    // Quantity adjustment
    if (
      event.target.classList.contains("increase-btn") ||
      event.target.classList.contains("decrease-btn")
    ) {
      const productId = parseInt(event.target.getAttribute("data-id"));
      const item = cart.find((item) => item.id === productId);

      if (item) {
        if (event.target.classList.contains("increase-btn")) {
          item.quantity += 1;
        } else if (item.quantity > 1) {
          item.quantity -= 1;
        }

        localStorage.setItem("cart", JSON.stringify(cart));
        renderCartItems();
        updateCartCount();
        toggleCheckoutButton();
      }
    }
  });
}

// Update cart badge count
function updateCartCount() {
  const cart = getCart();
  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartCountElement = document.getElementById("cart-count");
  if (cartCountElement) {
    cartCountElement.textContent = totalCount;
  }
}

// Enable or disable checkout button
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

// Show confirmation popup
function showConfirmation(message) {
  const confirmationDiv = document.createElement("div");
  confirmationDiv.textContent = message;
  confirmationDiv.style.position = "fixed";
  confirmationDiv.style.bottom = "20px";
  confirmationDiv.style.right = "20px";
  confirmationDiv.style.backgroundColor = "#4CAF50";
  confirmationDiv.style.color = "white";
  confirmationDiv.style.padding = "10px 20px";
  confirmationDiv.style.borderRadius = "5px";
  confirmationDiv.style.zIndex = "1000";

  document.body.appendChild(confirmationDiv);

  setTimeout(() => {
    document.body.removeChild(confirmationDiv);
  }, 3000);
}
