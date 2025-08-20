 let products = [];
let cartCount = 0;

async function loadProducts() {
  const res = await fetch("products.json");
  products = await res.json();

  // Səbətdə neçə məhsul varsa yuxarıda göstər
  const savedCart = JSON.parse(localStorage.getItem("cart")) || [];
  cartCount = savedCart.length;
  document.getElementById("cartCount").innerText = cartCount;

  displayProducts(products);
}

function displayProducts(items) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  items.forEach(product => {
    const div = document.createElement("div");
    div.classList.add("product");
    div.innerHTML = `
      <img src="${product.image}" alt="${product.name}">
      <h3>${product.name}</h3>
      <p><b>Kateqoriya:</b> ${product.category}</p>
      <p><b>Rəng:</b> ${product.color}</p>
      <p><b>Qiymət:</b> ${product.price} AZN</p>
      <button onclick="addToCart(${product.id})">Səbətə əlavə et</button>
      <button class="delete-btn" onclick="deleteProduct(${product.id})">Sil</button>
    `;
    container.appendChild(div);
  });
}

function deleteProduct(id) {
  products = products.filter(p => p.id !== id);
  displayProducts(products);
}

function addToCart(id) {
  const product = products.find(p => p.id === id);

  // LocalStorage-a əlavə et
  let cart = JSON.parse(localStorage.getItem("cart")) || [];
  cart.push(product);
  localStorage.setItem("cart", JSON.stringify(cart));

  // Sayı yenilə
  cartCount = cart.length;
  document.getElementById("cartCount").innerText = cartCount;

  // Bildiriş
  showToast("Səbətə əlavə edildi ✅");
}

function showToast(message) {
  const toast = document.getElementById("toast");
  toast.innerText = message;
  toast.className = "show";
  setTimeout(() => {
    toast.className = toast.className.replace("show", "");
  }, 2000);
}

document.getElementById("categoryFilter").addEventListener("change", applyFilters);
document.getElementById("colorFilter").addEventListener("change", applyFilters);

function applyFilters() {
  const category = document.getElementById("categoryFilter").value;
  const color = document.getElementById("colorFilter").value;

  let filtered = products;

  if (category) {
    filtered = filtered.filter(p => p.category === category);
  }
  if (color) {
    filtered = filtered.filter(p => p.color === color);
  }

  displayProducts(filtered);
}

loadProducts();
