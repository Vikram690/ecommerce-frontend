document.addEventListener("DOMContentLoaded", () => {
  // Get the product ID from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get('id'));

  // Dummy Products List
  const products = [
    {
      id: 1,
      name: 'Wireless Earbuds',
      price: '$10.00',
      description: 'High-quality sound and noise cancellation.',
      image: 'assets/Wireless Earbuds.webp',
    },
    {
      id: 2,
      name: 'RGB Gaming Mouse',
      price: '$20.00',
      description: 'Precision and customizable RGB lighting.',
      image: 'assets/RGB Gaming Mouse.webp',
    },
    {
      id: 3,
      name: 'RGB Mechanical Keyboard',
      price: '$30.00',
      description: 'Mechanical keys with RGB backlighting.',
      image: 'assets/RGB Mechanical Keyboard.webp',
    },
    {
      id: 4,
      name: 'Gaming Headset',
      price: '$40.00',
      description: 'Immersive sound with a noise-canceling mic.',
      image: 'assets/Gaming Headset.webp',
    },
    // Add more products here
  ];

  // Find the selected product by ID
  const product = products.find(p => p.id === productId);

  // If product is found, inject product details into the page
  if (product) {
    const productDetailSection = document.querySelector('#product-detail');
    productDetailSection.innerHTML = `
      <div class="product-detail">
        <img src="${product.image}" alt="${product.name}">
        <h1>${product.name}</h1>
        <p class="product-description">${product.description}</p>
        <p class="product-price">Price: ₹${product.price}</p>
        <button id="add-to-cart" data-product-id="${product.id}">Add to Cart</button>
      </div>
    `;

    // Add event listener for the 'Add to Cart' button
    const addToCartButton = document.querySelector('#add-to-cart');
    addToCartButton.addEventListener('click', () => {
      addToCart(product.id);
    });
  } else {
    // If the product is not found, display an error message
    document.querySelector('#product-detail').innerHTML = '<p>Product not found.</p>';
  }

  // Cart Logic 
  const cartIcon = document.querySelector('.cart');
  const cartBadge = document.querySelector('.cart-badge');
  
  // Add Product to Cart
  function addToCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const product = products.find(p => p.id === productId);
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

  // Update Cart on page load
  updateCartCount();
});