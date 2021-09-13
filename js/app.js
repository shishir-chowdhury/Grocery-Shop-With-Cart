const loadProducts = () => {
  const url = `https://fakestoreapi.com/products`;
  fetch(url)
    .then((response) => response.json())
    .then((data) => showProducts(data));
};
loadProducts();

// show all product in UI 
const showProducts = (products) => {
  console.log(products);
  const allProducts = products.map((pd) => pd);
  for (const product of allProducts) {
    const image = product.images;
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `<div class="single-product">
      <div>
    <img class="product-image" src=${product.image}></img>
      </div>
      <h3>${product.title}</h3>
      <p>Category: ${product.category}</p>
      <h2>Price: $ ${product.price}</h2>
      <p>Rating: ${product.rating.rate} Count:${product.rating.count} </p>
      <button onclick="addToCart(${product.id},${product.price})" id="addToCart-btn" class="buy-now btn btn-success">add to cart</button>
      <button id="details-btn" class="btn btn-danger" onclick="productDetails(${product.id})" data-bs-toggle="modal" data-bs-target="#exampleModal">Details</button></div>
      `;
    document.getElementById("all-products").appendChild(div);
  }
};
const productDetails = productID => {
  const url = `https://fakestoreapi.com/products/${productID}`;
  fetch(url)
    .then(res => res.json())
    .then(data => displayProductDetails(data));
}
productDetails();
const displayProductDetails = pro => {
  // console.log(pro);
  const proDetails = document.getElementById("product-details");
  proDetails.textContent = '';
  const div = document.createElement('div');
  div.classList.add('card');
  div.innerHTML = `
        <img src="${pro.image}" class="card-img-top" alt="..." />
        <div class="card-body">
          <h3 class="card-title">${pro.title}</h3>
          <p class="card-text">${pro.description}</p>
        </div>
    `;
  proDetails.appendChild(div);
}


let count = 0;
const addToCart = (id, price) => {
  count = count + 1;
  updatePrice("price", price);

  updateTaxAndCharge();
  document.getElementById("total-Products").innerText = count;
};

const getInputValue = (id) => {
  const element = document.getElementById(id).innerText;
  const converted = parseFloat(element);
  return converted;
};

// main price update function
const updatePrice = (id, value) => {
  const convertedOldPrice = getInputValue(id);
  const convertPrice = parseFloat(value);
  const total = (convertedOldPrice + convertPrice).toFixed(2);
  document.getElementById(id).innerText = (total);
  updateTotal();
};

// set innerText function
const setInnerText = (id, value) => {
  document.getElementById(id).innerText = (value);
};

// update delivery charge and total Tax
const updateTaxAndCharge = () => {
  const priceConverted = getInputValue("price");
  if (priceConverted > 200) {
    setInnerText("delivery-charge", 30);
    setInnerText("total-tax", (priceConverted * 0.2).toFixed(2));
  }
  if (priceConverted > 400) {
    setInnerText("delivery-charge", 50);
    setInnerText("total-tax", (priceConverted * 0.3).toFixed(2));
  }
  if (priceConverted > 500) {
    setInnerText("delivery-charge", 60);
    setInnerText("total-tax", (priceConverted * 0.4).toFixed(2));
  }
  updateTotal();
};

//grandTotal update function
const updateTotal = () => {
  const grand =
    getInputValue("price") + getInputValue("delivery-charge") +
    getInputValue("total-tax");
  const grandTotal = grand.toFixed(2)
  console.log(grandTotal);
  document.getElementById("total").innerText = grandTotal;
};

