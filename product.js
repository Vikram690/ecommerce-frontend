document.addEventListener("DOMContentLoaded", () => {
    // Retrieve the product ID from the URL
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');
  
    // Define the products (you may want to store this data elsewhere, like an API or local storage)
    const products = [
      {
        id: '1',
        name: 'Wireless Earbuds',
        price: '$10.00',
        description: 'High-quality wireless earbuds with noise cancellation.',
        image: 'assets/Wireless Earbuds.webp',
      },
      {
        id: '2',
        name: 'RGB Gaming Mouse',
        price: '$20.00',
        description: 'RGB lights and precision control for gaming.',
        image: 'assets/RGB Gaming Mouse.webp',
      },
      {
        id: '3',
        name: 'RGB Mechanical Keyboard',
        price: '$30.00',
        description: 'Mechanical keyboard with RGB backlighting.',
        image: 'assets/RGB Mechanical Keyboard.webp',
      },
      {
        id: '4',
        name: 'Gaming Headset',
        price: '$40.00',
        description: 'Comfortable gaming headset with surround sound.',
        image: 'assets/Gaming Headset.webp',
      },
      {
        id: '5',
        name: 'Portable Bluetooth Speaker',
        price: '$50.00',
        description: 'Portable and waterproof Bluetooth speaker.',
        image: 'assets/Portable Bluetooth Speaker.webp',
      },
      {
        id: '6',
        name: 'Adjustable Dumbbells',
        price: '$60.00',
        description: 'Adjustable dumbbells for home fitness.',
        image: 'assets/Adjustable Dumbbells.webp',
      },
      {
        id: '7',
        name: 'Resistance Band Set',
        price: '$70.00',
        description: 'Resistance bands for full-body workouts.',
        image: 'assets/Resistance Band Set.webp',
      },
      {
        id: '8',
        name: 'Wrist Support Fitness Wristband - Adjustable',
        price: '$80.00',
        description: 'Adjustable wristband for extra wrist support during workouts.',
        image: 'assets/Wrist Support Fitness Wristband - Adjustable.webp',
      },
    ];
  
    // Find the product based on the productId
    const product = products.find(p => p.id === productId);
  
    if (product) {
      // Display product details on the page
      const productDetail = document.getElementById('product-detail');
      productDetail.innerHTML = `
        <div class="product-detail-card">
          <img src="${product.image}" alt="${product.name}" class="product-detail-image">
          <div class="product-detail-info">
            <h1>${product.name}</h1>
            <p class="product-description">${product.description}</p>
            <p class="product-price">${product.price}</p>
            <button class="add-to-cart">Add to Cart</button>
          </div>
        </div>
      `;
  
      // Add event listener to the "Add to Cart" button
      const addToCartButton = document.querySelector('.add-to-cart');
      addToCartButton.addEventListener('click', () => {
        // Simulate adding to the cart
        let cartCount = localStorage.getItem('cartCount') || 0;
        cartCount++;
        localStorage.setItem('cartCount', cartCount);
  
        // Update the cart count display
        const cartCountDisplay = document.getElementById('cart-count');
        cartCountDisplay.textContent = cartCount;
      });
    } else {
      // If no product found, display an error message
      document.getElementById('product-detail').innerHTML = '<p>Product not found!</p>';
    }
  
    // Update the cart count on page load
    const cartCount = localStorage.getItem('cartCount') || 0;
    const cartCountDisplay = document.getElementById('cart-count');
    cartCountDisplay.textContent = cartCount;
  });
  