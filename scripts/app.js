// Wait until the DOM is fully loaded
document.addEventListener("DOMContentLoaded", () => {
  // Hamburger Menu Toggle
  const hamburger = document.querySelector(".hamburger");
  const nav = document.querySelector(".nav");

  hamburger.addEventListener("click", () => {
    nav.classList.toggle("active");
  });

  // Sticky Header on Scroll
  window.addEventListener('scroll', function () {
    const header = document.querySelector('.header');
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Initialize product grid and load products
  loadProducts();
  updateCartCount();

  // Cart Logic 
  const cartIcon = document.querySelector('.cart');
  const cartBadge = document.querySelector('.cart-badge');
  let cartItems = 0;

  // Add to Cart Button Logic
  const addToCartButtons = document.querySelectorAll('.product-card button');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      event.stopPropagation(); // Prevent triggering the product card click event
      const productId = parseInt(button.getAttribute("data-product-id"));
      addToCart(productId);
    });
  });

  // Mobile menu toggle
  const navLinks = document.querySelector('.nav-links');
  if (hamburger && navLinks) {
    hamburger.addEventListener('click', () => {
      navLinks.classList.toggle('active');
    });
  }
});

// Dummy Products List
const products = [
  { id: 1, name: 'Wireless Earbuds', price: '$10.00', image: 'assets/Wireless Earbuds.webp' },
  { id: 2, name: 'RGB Gaming Mouse', price: '$20.00', image: 'assets/RGB Gaming Mouse.webp' },
  { id: 3, name: 'RGB Mechanical Keyboard', price: '$30.00', image: 'assets/RGB Mechanical Keyboard.webp' },
  { id: 4, name: 'Gaming Headset', price: '$40.00', image: 'assets/Gaming Headset.webp' },
  { id: 5, name: 'Portable Bluetooth Speaker', price: '$50.00', image: 'assets/Portable Bluetooth Speaker.webp' },
  { id: 6, name: 'Adjustable Dumbbells', price: '$60.00', image: 'assets/Adjustable Dumbbells.webp' },
  { id: 7, name: 'Resistance Band Set', price: '$70.00', image: 'assets/Resistance Band Set.webp' },
  { id: 8, name: 'Wrist Support Fitness Wristband - Adjustable', price: '$80.00', image: 'assets/Wrist Support Fitness Wristband - Adjustable.webp' },
];

// Load Products Dynamically into Product Grid
function loadProducts() {
  const grid = document.querySelector('.product-grid');
  products.forEach(product => {
    const card = document.createElement('div');
    card.classList.add('product-card');
    card.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p>₹${product.price}</p>
      <button data-product-id="${product.id}">Add to Cart</button>
    `;
    grid.appendChild(card);
  });
}

// Add Product to Cart
function addToCart(productId) {
  const product = products.find(p => p.id === productId);
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
  }, 2000); // Popup will disappear after 2 seconds
}

// Show Cart Items with Remove Button and Total
function showCart() {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const cartContainer = document.querySelector('.cart-items');
  cartContainer.innerHTML = ''; // Clear previous items

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
      <p>₹${item.price} x ${item.quantity}</p>
      <button class="remove-item" data-product-id="${item.id}">Remove</button>
    `;
    cartContainer.appendChild(div);

    // Calculate the total
    total += parseFloat(item.price.slice(1)) * item.quantity;
  });

  // Display the total
  const totalDiv = document.createElement('div');
  totalDiv.classList.add('cart-total');
  totalDiv.innerHTML = `<h3>Total: ₹${total.toFixed(2)}</h3>`;
  cartContainer.appendChild(totalDiv);

  // Add Remove Item Functionality
  const removeButtons = document.querySelectorAll('.remove-item');
  removeButtons.forEach(button => {
    button.addEventListener('click', (event) => {
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

// Show Cart on Cart Icon Click
cartIcon.addEventListener('click', () => {
  showCart();
});
