
    // Fetch the JSON data and generate tiles
    fetch('menu.json')
      .then(response => response.json())
      .then(data => {
        const categories = data.categories;
        const menuContainer = document.getElementById('menu-container');
        const categoryContainer = document.querySelector('.category-container');
  
        // Create category buttons
        categories.forEach(category => {
          const categoryButton = document.createElement('div');
          categoryButton.classList.add('category-button');
          categoryButton.textContent = category.name;
          categoryButton.dataset.category = category.name.toLowerCase().replace(/\s/g, '-');
          categoryContainer.appendChild(categoryButton);
        });
  
        // Handle category button click event
        const categoryButtons = document.querySelectorAll('.category-button');
        categoryButtons.forEach(button => {
          button.addEventListener('click', () => {
            const selectedCategory = button.dataset.category;
  
            // Remove active class from all buttons and add to the selected button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
  
            // Generate tiles based on the selected category
            generateTiles(selectedCategory);
          });
        });
  
        // Generate tiles for the initial "All" category
        generateTiles('all');
  
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
  
                const dishName = document.createElement('h3');
                dishName.textContent = dish.name;
                tile.appendChild(dishName);
  
                const dishPrice = document.createElement('p');
                dishPrice.textContent = 'Price: ₹' + dish.price;
                tile.appendChild(dishPrice);
  
                dishesContainer.appendChild(tile);
              });
  
              menuContainer.appendChild(dishesContainer);
            }
          });
        }
      })
      .catch(error => {
        console.log('An error occurred while fetching the menu data:', error);
      });