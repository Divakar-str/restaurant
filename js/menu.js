// Fetch the JSON data and generate tiles
fetch('menu.json')
  .then(response => response.json())
  .then(data => {
    const categories = data.categories;
    const menuContainer = document.getElementById('menu-container');
    const categoryContainer = document.querySelector('.category-container');
    const cartContent = document.getElementById('cart-content');
    const cartTotal = document.getElementById('cart-total');
    const placeOrderButton = document.querySelector('.place-order-button');
    const cart = [];

    // Create category buttons
    categories.forEach(category => {
      const categoryButton = document.createElement('div');
      categoryButton.classList.add('category-button');
      categoryButton.textContent = category.name;
      categoryButton.dataset.category = category.name.toLowerCase().replace(/\s/g, '-');
      categoryContainer.appendChild(categoryButton);

      // Add event listener to handle category selection
      categoryButton.addEventListener('click', () => {
        const selectedCategory = categoryButton.dataset.category;
        setActiveCategory(selectedCategory);
        generateTiles(selectedCategory);
      });
    });

    // Generate tiles for the initial "All" category
    generateTiles('all');

    // Function to set active category
    function setActiveCategory(selectedCategory) {
      const categoryButtons = document.querySelectorAll('.category-button');
      categoryButtons.forEach(button => {
        if (button.dataset.category === selectedCategory) {
          button.classList.add('active');
        } else {
          button.classList.remove('active');
        }
      });
    }

    // Function to generate tiles based on the selected category
    function generateTiles(category) {
      menuContainer.innerHTML = '';

      categories.forEach(categoryData => {
        if (category === 'all' || categoryData.name.toLowerCase().replace(/\s/g, '-') === category) {
          const categoryHeading = document.createElement('h2');
          categoryHeading.textContent = categoryData.name;
          menuContainer.appendChild(categoryHeading);

          const dishesContainer = document.createElement('div');
          dishesContainer.classList.add('tile-container');

          categoryData.dishes.forEach(dish => {
            const tile = document.createElement('div');
            tile.classList.add('tile');

            const dishImage = document.createElement('img');
            dishImage.src = dish.image;
            dishImage.alt = dish.name;
            tile.appendChild(dishImage);

            const dishtype = document.createElement('div');
            dishtype.textContent = ".";
            if (dish.type === "Vegetarian") {
              dishtype.classList.add('veg-symbol');
              dishtype.innerHTML = '<i class="fas fa-carrot"></i>';
            }
            else {
              dishtype.classList.add('non-veg-symbol');
              dishtype.innerHTML = ' <i class="fas fa-drumstick-bite"></i>';
            }
            tile.appendChild(dishtype);


            const dishName = document.createElement('h3');
            dishName.textContent = dish.name;
            tile.appendChild(dishName);

            const dishPrice = document.createElement('p');
            dishPrice.textContent = 'Price: ₹' + dish.price;
            tile.appendChild(dishPrice);

            const decreaseBtn = document.createElement('button');
            decreaseBtn.textContent = '-';
            decreaseBtn.addEventListener('click', () => {
              decreaseQuantity(quantitySelector);
            });
            tile.appendChild(decreaseBtn);

            const quantitySelector = document.createElement('input');
            quantitySelector.type = 'number';
            quantitySelector.min = 1;
            quantitySelector.value = 1;
            tile.appendChild(quantitySelector);

            const increaseBtn = document.createElement('button');
            increaseBtn.textContent = '+';
            increaseBtn.addEventListener('click', () => {
              increaseQuantity(quantitySelector);
            });
            tile.appendChild(increaseBtn);

            const addToCartButton = document.createElement('button');
            addToCartButton.classList.add('atc-button');
            addToCartButton.textContent = 'Add to Cart';
            addToCartButton.addEventListener('click', () => {
              const quantity = parseInt(quantitySelector.value);
              if (quantity > 0) {
                addToCart(dish, quantity);
              }
            });
            tile.appendChild(addToCartButton);

            dishesContainer.appendChild(tile);
          });

          menuContainer.appendChild(dishesContainer);
        }
      });
    }

    // Function to add the dish to the cart with quantity
    function addToCart(dish, quantity) {
      const existingCartItemIndex = cart.findIndex(item => item.id === dish.id);

      if (existingCartItemIndex !== -1) {
        cart[existingCartItemIndex].quantity += quantity;
      } else {
        const cartItem = {
          ...dish,
          quantity: quantity,
        };
        cart.push(cartItem);
      }

      updateCartDisplay();
    }

    // Function to remove a dish from the cart
    function removeFromCart(dishId) {
      const itemIndex = cart.findIndex(item => item.id === dishId);

      if (itemIndex !== -1) {
        cart.splice(itemIndex, 1);
        updateCartDisplay();
      }
    }

    // Function to update the cart display
    function updateCartDisplay() {
      cartContent.innerHTML = '';
      let totalAmount = 0;

      cart.forEach((cartItem, index) => {
        const cartItemDiv = document.createElement('div');
        cartItemDiv.classList.add('cart-item');
        const cartItemSNo = document.createElement('span');
        cartItemSNo.textContent = index + 1;
        cartItemDiv.appendChild(cartItemSNo);
        const cartItemName = document.createElement('span');
        cartItemName.textContent = cartItem.name;
        cartItemDiv.appendChild(cartItemName);
        const cartItemPrice = document.createElement('span');
        cartItemPrice.textContent = `₹${cartItem.price}`;
        cartItemDiv.appendChild(cartItemPrice);

        const quantityContainer = document.createElement('span'); // New span container for quantity and buttons
        const decreaseBtn = document.createElement('button');
        decreaseBtn.textContent = '-';
        decreaseBtn.classList.add('quantity-button'); // Add class to "-" button
        decreaseBtn.addEventListener('click', () => {
          decreaseCartItemQuantity(cartItem.id);
        });
        quantityContainer.appendChild(decreaseBtn);

        const cartItemQuantity = document.createElement('span');
        cartItemQuantity.textContent = cartItem.quantity;
        quantityContainer.appendChild(cartItemQuantity);

        const increaseBtn = document.createElement('button');
        increaseBtn.textContent = '+';
        increaseBtn.classList.add('quantity-button'); // Add class to "+" button
        increaseBtn.addEventListener('click', () => {
          increaseCartItemQuantity(cartItem.id);
        });
        quantityContainer.appendChild(increaseBtn);

        cartItemDiv.appendChild(quantityContainer);

        const cartItemTotalPrice = document.createElement('span');
        const itemTotal = cartItem.price * cartItem.quantity;
        cartItemTotalPrice.textContent = `₹${itemTotal}`;
        cartItemDiv.appendChild(cartItemTotalPrice);
        totalAmount += itemTotal;

        const removeButton = document.createElement('button');
        removeButton.classList.add('remove-button');
        removeButton.innerHTML = '<i class="fas fa-trash-alt"></i>';
        removeButton.addEventListener('click', () => {
          removeFromCart(cartItem.id);
        });

        cartItemDiv.appendChild(removeButton);

        cartContent.appendChild(cartItemDiv);
      });

      cartTotal.textContent = `Total Amount: ₹${totalAmount}`;
    }



    // Function to decrease the quantity of a cart item
    function decreaseCartItemQuantity(itemId) {
      const cartItem = cart.find(item => item.id === itemId);
      if (cartItem && cartItem.quantity > 1) {
        cartItem.quantity--;
        updateCartDisplay();
      }
    }

    // Function to increase the quantity of a cart item
    function increaseCartItemQuantity(itemId) {
      const cartItem = cart.find(item => item.id === itemId);
      if (cartItem) {
        cartItem.quantity++;
        updateCartDisplay();
      }
    }

    

    placeOrderButton.addEventListener('click', () => {
      const urlParams = new URLSearchParams(window.location.search);
      const tableId = urlParams.get('id');
      if (cart.length === 0) {
        alert("Your cart is empty. Please add items before placing an order.");
        return [];
      }
      // if (!tableId) {
      //   alert("Table ID is missing from the URL.");
      //   return;
      // }


      // Create an array to store the order details
      const orderDetails = [];
      // Loop through the cart array to get each item and its quantity
      cart.forEach(cartItem => {
        const { name, price, quantity } = cartItem;
        const totalAmount = price * quantity;

        // Create an object representing each item in the order
        const orderItem = {
          name: name,
          price: price,
          quantity: quantity,
          totalAmount: totalAmount,
          tableId: tableId, // Add the table ID to the order item
        };

        // Add the order item to the order details array
        orderDetails.push(orderItem);
      });
      console.log(orderDetails)
      toggleCartPopup();
      cart.splice(0);
      updateCartDisplay();
      alert("The order is successfully placed...");

    });

  })
  .catch(error => {
    console.log('An error occurred while fetching the menu data:', error);
  });

// Function to toggle the cart popup
function toggleCartPopup() {
  const cartPopup = document.getElementById('cartPopup');
  cartPopup.classList.toggle('open');
}

// Function to decrease the quantity
function decreaseQuantity(input) {
  let value = parseInt(input.value);
  if (value > 1) {
    input.value = value - 1;
  }
}

// Function to increase the quantity
function increaseQuantity(input) {
  let value = parseInt(input.value);
  input.value = value + 1;
}



