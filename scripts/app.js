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

  // Swiper Initialization (For carousel/slider)
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

 // Example Dynamic Product Loading
  const products = [
    {
      name: 'Wireless Earbuds',
      price: '$10.00',
      image: 'assets/Wireless Earbuds.webp',
    },
    {
      name: 'RGB Gaming Mouse',
      price: '$20.00',
      image: 'assets/RGB Gaming Mouse.webp',
    },
    {
      name: 'RGB Mechanical Keyboard',
      price: '$30.00',
      image: 'assets/RGB Mechanical Keyboard.webp',
    },
    {
      name: 'Gaming Headset',
      price: '$40.00',
      image: 'assets/Gaming Headset.webp',
    },
    {
      name: 'Portable Bluetooth Speaker',
      price: '$50.00',
      image: 'assets/Portable Bluetooth Speaker.webp',
    },
    {
      name: 'Adjustable Dumbbells',
      price: '$60.00',
      image: 'assets/Adjustable Dumbbells.webp',
    },
    {
      name: 'Resistance Band Set',
      price: '$70.00',
      image: 'assets/Resistance Band Set.webp',
    },
    {
      name: 'Wrist Support Fitness Wristband - Adjustable',
      price: '$80.00',
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
