let productsData = [];
let currentPage = 1;
const itemsPerPage = 20;

document.addEventListener("DOMContentLoaded", () => {
  fetch("gaming_products.json")
    .then((response) => response.json())
    .then((data) => {
      productsData = data;
      displayProducts();
      setupPagination();
    })
    .catch((error) => console.error("Error loading JSON:", error));

  // Search button event listener
  document.getElementById("searchBtn").addEventListener("click", () => {
    currentPage = 1;
    displayProducts();
    setupPagination();
  });

  // Also allow Enter key in the search field to trigger search
  document.getElementById("search").addEventListener("keypress", (event) => {
    if (event.key === "Enter") {
      currentPage = 1;
      displayProducts();
      setupPagination();
    }
  });
});

function displayProducts() {
  const productsContainer = document.getElementById("products");
  productsContainer.innerHTML = "";

  let filteredData = filterProducts(productsData);
  let start = (currentPage - 1) * itemsPerPage;
  let end = start + itemsPerPage;
  let paginatedItems = filteredData.slice(start, end);

  paginatedItems.forEach((product) => {
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
}

function setupPagination() {
  const paginationContainer = document.getElementById("pagination");
  paginationContainer.innerHTML = "";

  let filteredData = filterProducts(productsData);
  let totalPages = Math.ceil(filteredData.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    let pageButton = document.createElement("button");
    pageButton.textContent = i;
    pageButton.className = i === currentPage ? "active" : "";
    pageButton.onclick = () => {
      currentPage = i;
      displayProducts();
      setupPagination();
    };
    paginationContainer.appendChild(pageButton);
  }
}

function filterProducts(data) {
  let searchQuery = document.getElementById("search").value.toLowerCase();
  return data.filter((product) => product.name.toLowerCase().includes(searchQuery));
}
