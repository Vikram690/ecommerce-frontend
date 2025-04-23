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

  // Swiper Initialization
  const swiper = new Swiper('.swiper', {
    loop: true,
    pagination: { 
      el: '.swiper-pagination',
      clickable: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
  });

  // Example Dynamic Product Loading (for simplicity, use hardcoded data)
  const products = [
    {
      name: 'Wireless Earbuds',
      price: '$39.99',
      image: 'assets/Wireless Earbuds.webp',
    },
    {
      name: 'RGB Gaming Mouse',
      price: '$24.99',
      image: 'assets/RGB Gaming Mouse.webp',
    },
    {
      name: 'RGB Mechanical Keyboard',
      price: '$64.99',
      image: 'assets/RGB Mechanical Keyboard.webp',
    },
    {
      name: 'Gaming Headset',
      price: '$49.99',
      image: 'assets/Gaming Headset.webp',
    },
    {
      name: 'Portable Bluetooth Speaker',
      price: '$29.99',
      image: 'assets/Portable Bluetooth Speaker.webp',
    },
    {
      name: 'Adjustable Dumbbells',
      price: '$89.99',
      image: 'assets/Adjustable Dumbbells.webp',
    },
    {
      name: 'Resistance Band Set',
      price: '$19.99',
      image: 'assets/Resistance Band Set.webp',
    },
    {
      name: 'Wrist Support Fitness Wristband - Adjustable',
      price: '$19.99',
      image: 'assets/Wrist Support Fitness Wristband - Adjustable.webp',
    },
    
  ];

  const productGrid = document.querySelector('.product-grid');

  // Loop through the products array and create product cards dynamically
  products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card');

    productCard.innerHTML = `
      <img src="${product.image}" alt="${product.name}" class="product-image" loading="lazy">
      <h3>${product.name}</h3>
      <p>${product.price}</p>
      <button>Add to Cart</button>
    `;

    // Append the product card to the product grid
    productGrid.appendChild(productCard);
  });

  // Cart Logic 
  const cartIcon = document.querySelector('.cart');
  const cartBadge = document.querySelector('.cart-badge');
  let cartItems = 0;

  // Simulate adding items to the cart
  const addToCartButtons = document.querySelectorAll('.product-card button');
  addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
      cartItems++;
      cartBadge.textContent = cartItems;
    });
  });

  // Initialize the cart badge count to 0 initially
  cartBadge.textContent = cartItems;
});
