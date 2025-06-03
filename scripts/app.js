document.addEventListener("DOMContentLoaded", main);

function main() {
  // Elements
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav");
  const navLinks = document.querySelector(".nav-links");
  const cartIcon = document.getElementById("cartIcon");

  // Hamburger Menu Toggle
  if (hamburger && nav) {
    hamburger.addEventListener("click", () => {
      nav.classList.toggle("active");
      if (navLinks) navLinks.classList.toggle("active");
    });
  }

  // Sticky Header
  const header = document.querySelector(".header");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  });

  // Load Products & Setup Cart
  loadProducts();
  updateCartCount();

  // Cart Icon Click
  if (cartIcon) {
    cartIcon.addEventListener("click", () => {
      const isLoggedIn = localStorage.getItem("isLoggedIn");
      if (isLoggedIn === "true") {
        window.location.href = "cart.html";
      } else {
        localStorage.setItem("redirectAfterLogin", "cart.html");
        window.location.href = "login-signup.html";
      }
    });
  }

  // If on cart page, show cart items
  if (window.location.pathname.includes("cart.html")) {
    showCart();
  }
}

// Dummy Products List
const products = [
  { id: 1, name: 'Wireless Earbuds', price: 100.00, image: 'assets/Wireless Earbuds.webp' },
  { id: 2, name: 'RGB Gaming Mouse', price: 200.00, image: 'assets/RGB Gaming Mouse.webp' },
  { id: 3, name: 'RGB Mechanical Keyboard', price: 300.00, image: 'assets/RGB Mechanical Keyboard.webp' },
  { id: 4, name: 'Gaming Headset', price: 400.00, image: 'assets/Gaming Headset.webp' },
  { id: 5, name: 'Portable Bluetooth Speaker', price: 500.00, image: 'assets/Portable Bluetooth Speaker.webp' },
  { id: 6, name: 'Adjustable Dumbbells', price: 600.00, image: 'assets/Adjustable Dumbbells.webp' },
  { id: 7, name: 'Resistance Band Set', price: 700.00, image: 'assets/Resistance Band Set.webp' },
  { id: 8, name: 'Wrist Support Fitness Wristband - Adjustable', price: 800.00, image: 'assets/Wrist Support Fitness Wristband - Adjustable.webp' },
];

// Load Products Dynamically
function loadProducts() {
  const grid = document.querySelector(".product-grid");
  if (!grid) return;

  products.forEach(product => {
    const card = document.createElement("div");
    card.classList.add("product-card");
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₹${product.price.toFixed(2)}</p>
      <button data-product-id="${product.id}">Add to Cart</button>
    `;
    grid.appendChild(card);
  });

  // Attach "Add to Cart" button events after loading products
  const addToCartButtons = document.querySelectorAll('.product-card button');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      event.stopPropagation();
      const productId = parseInt(button.getAttribute("data-product-id"));
      addToCart(productId);
    });
  });
}

// Add Product to Cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
  if (!product) {
    console.error("Product not found:", productId);
    return;
  }

  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingItem = cart.find(item => item.id === productId);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ ...product, quantity: 1 });
  }

  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  showConfirmation(`${product.name} added to cart!`);
}

// Update Cart Badge Count
function updateCartCount() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const count = cart.reduce((total, item) => total + item.quantity, 0);
  const cartBadge = document.querySelector('.cart-badge');
  if (cartBadge) {
    cartBadge.textContent = count;
  }
}

// Show Confirmation Popup
function showConfirmation(message) {
  const div = document.createElement('div');
  div.textContent = message;
  div.style.position = 'fixed';
  div.style.bottom = '20px';
  div.style.right = '20px';
  div.style.padding = '10px 20px';
  div.style.background = '#4caf50';
  div.style.color = '#fff';
  div.style.borderRadius = '8px';
  div.style.boxShadow = '0 4px 8px rgba(0,0,0,0.2)';
  div.style.zIndex = 9999;
  document.body.appendChild(div);

  setTimeout(() => {
    div.remove();
  }, 2000);
}

// Show Cart Page Items
function showCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartContainer = document.querySelector('.cart-items');
  if (!cartContainer) return;

  cartContainer.innerHTML = '';

  if (cart.length === 0) {
    cartContainer.innerHTML = '<p>Your cart is empty.</p>';
    return;
  }

  let total = 0;
  cart.forEach(item => {
    const div = document.createElement('div');
    div.classList.add('cart-item');
    div.innerHTML = `
      <img src="${item.image}" alt="${item.name}">
      <h3>${item.name}</h3>
      <p>₹${item.price.toFixed(2)} x ${item.quantity}</p>
      <button class="remove-item" data-product-id="${item.id}">Remove</button>
    `;
    cartContainer.appendChild(div);
    total += item.price * item.quantity;
  });

  const totalDiv = document.createElement('div');
  totalDiv.classList.add('cart-total');
  totalDiv.innerHTML = `<h3>Total: ₹${total.toFixed(2)}</h3>`;
  cartContainer.appendChild(totalDiv);

  // Remove Buttons Logic
  const removeButtons = document.querySelectorAll('.remove-item');
  removeButtons.forEach(button => {
    button.addEventListener('click', () => {
      const productId = parseInt(button.getAttribute('data-product-id'));
      removeFromCart(productId);
    });
  });
}

// Remove Product from Cart
function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  updateCartCount();
  showCart();
}
