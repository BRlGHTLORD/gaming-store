fetch("gaming_products.json")
  .then(response => response.json())
  .then(data => {
    let productsContainer = document.getElementById("products");
    data.forEach(product => {
      let productHTML = `
        <div class="product">
          <img src="${product.image}" alt="${product.name}">
          <h3>${product.name}</h3>
          <p>Category: ${product.main_category} - ${product.sub_category}</p>
          <p>⭐ ${product.ratings} (${product.no_of_ratings} reviews)</p>
          <p>💲 ${product.price}</p>
        </div>
      `;
      productsContainer.innerHTML += productHTML;
    });
  })
  .catch(error => console.error("Error loading JSON:", error));
