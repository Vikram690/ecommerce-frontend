document.addEventListener("DOMContentLoaded", () => {
  const cartItemsContainer = document.getElementById("cartContainer");
  const totalPriceElement = document.getElementById("total-price");
  const cartCountElement = document.getElementById("cart-count");

  // Retrieve cart data from localStorage
  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  // Update cart item count in header
  if (cartCountElement) {
    const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalCount;
  }

  // If cart is empty
  if (cart.length === 0) {
    cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
    if (totalPriceElement) totalPriceElement.textContent = "0.00";
    return;
  }

  // Otherwise, render cart items
  let totalPrice = 0;
  cartItemsContainer.innerHTML = ""; // Clear any previous content

  cart.forEach(item => {
    const itemTotal = parseFloat(item.price.toString().replace("₹", "").trim()) * item.quantity;
    totalPrice += itemTotal;

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");

    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}" width="100">
      <div>
        <h3>${item.name}</h3>
        <p>₹${item.price} x ${item.quantity}</p>
        <p>Total: ₹${itemTotal.toFixed(2)}</p>
        <button class="remove-btn" data-id="${item.id}">Remove</button>
      </div>
    `;

    cartItemsContainer.appendChild(itemDiv);
  });

  // Update total price
  if (totalPriceElement) {
    totalPriceElement.textContent = totalPrice.toFixed(2);
  }

  // Handle item removal
  document.querySelectorAll(".remove-btn").forEach(btn => {
    btn.addEventListener("click", function () {
      const productId = this.getAttribute("data-id");

      // Remove item from cart
      cart = cart.filter(item => item.id !== productId);

      // Update localStorage
      localStorage.setItem("cart", JSON.stringify(cart));

      // Re-render the cart items after removal without page reload
      loadCartItems();
      updateCartCount();
    });
  });
});

// Function to load cart items dynamically
function loadCartItems() {
  const cartItemsContainer = document.getElementById("cartContainer");
  const totalPriceElement = document.getElementById("total-price");

  let cart = JSON.parse(localStorage.getItem('cart')) || [];

  cartItemsContainer.innerHTML = ""; // Clear any previous content
  let totalPrice = 0;

  cart.forEach(item => {
    const itemTotal = parseFloat(item.price.toString().replace("₹", "").trim()) * item.quantity;
    totalPrice += itemTotal;

    const itemDiv = document.createElement("div");
    itemDiv.classList.add("cart-item");

    itemDiv.innerHTML = `
      <img src="${item.image}" alt="${item.name}" width="100">
      <div>
        <h3>${item.name}</h3>
        <p>₹${item.price} x ${item.quantity}</p>
        <p>Total: ₹${itemTotal.toFixed(2)}</p>
        <button class="remove-btn" data-id="${item.id}">Remove</button>
      </div>
    `;

    cartItemsContainer.appendChild(itemDiv);
  });

  // Update total price
  if (totalPriceElement) {
    totalPriceElement.textContent = totalPrice.toFixed(2);
  }
}
  
// Function to update cart item count in the header
function updateCartCount() {
  const cartCountElement = document.getElementById("cart-count");
  const cart = JSON.parse(localStorage.getItem('cart')) || [];

  const totalCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  if (cartCountElement) {
    cartCountElement.textContent = totalCount;
  }
}
