

/***********************
  PRODUCT DATA
************************/
const productsData = {
  oily: [
    { name: "Oil Control Face Wash", price: 299, img: "images/oily/facewash.png" },
    { name: "Niacinamide Serum", price: 499, img: "images/oily/serum.png" },
    { name: "Gel Moisturizer", price: 399, img: "images/oily/moisturizer.png" },
    { name: "Matte Sunscreen", price: 499, img: "images/oily/sunscreen.png" },
    { name: "Clay Mask", price: 599, img: "images/oily/mask.webp" }
  ],

  dry: [
    { name: "Cream Face Wash", price: 299, img: "images/dry/facewash.png" },
    { name: "Ceramide Serum", price: 499, img: "images/dry/serum.png" },
    { name: "Deep Moisturizer", price: 449, img: "images/dry/moisturizer.png" },
    { name: "Hydrating Sunscreen", price: 499, img: "images/dry/sunscreen.png" },
    { name: "Clay Mask", price: 599, img: "images/dry/mask.webp" }
  ],

  normal: [
    { name: "Gentle Face Wash", price: 299, img: "images/normal/facewash.png" },
    { name: "Vitamin C Serum", price: 499, img: "images/normal/serum.png" },
    { name: "Daily Moisturizer", price: 399, img: "images/normal/moisturizer.png" },
    { name: "SPF Sunscreen", price: 449, img: "images/normal/sunscreen.png" },
    { name: "Clay Mask", price: 566, img: "images/normal/mask.webp" }
  ],

  combination: [
    { name: "Balancing Face Wash", price: 299, img: "images/combination/facewash.png" },
    { name: "Hyaluronic Serum", price: 499, img: "images/combination/serum.png" },
    { name: "Light Moisturizer", price: 399, img: "images/combination/moisturizer.png" },
    { name: "SPF 50 Sunscreen", price: 499, img: "images/combination/sunscreen.png" }
  ]
};

/***********************
  CART LOGIC
************************/
let cart = [];
let total = 0;

function showProducts(type) {
  const container = document.getElementById("products");
  container.innerHTML = "";

  productsData[type].forEach(product => {
    container.innerHTML += `
      <div class="product">
        <img src="${product.img}">
        <h3>${product.name}</h3>
        <p>₹${product.price}</p>
        <button onclick="addToCart('${product.name}', ${product.price})">
          Add to Cart
        </button>
      </div>
    `;
  });
}

function addToCart(name, price) {
  cart.push({ name, price });
  total += price;
  updateCart();
  document.getElementById("cart-count").innerText = cart.length;
}

function removeFromCart(index) {
  total -= cart[index].price;
  cart.splice(index, 1);
  updateCart();
  document.getElementById("cart-count").innerText = cart.length;
}

function updateCart() {
  const list = document.getElementById("cart-items");
  list.innerHTML = "";

  cart.forEach((item, index) => {
    list.innerHTML += `
      <li>
        ${item.name} - ₹${item.price}
        <button onclick="removeFromCart(${index})">❌</button>
      </li>
    `;
  });

  document.getElementById("total").innerText = total;
}

function toggleCart() {
  document.getElementById("cart-panel").classList.toggle("open");
}

/***********************
  PLACE ORDER (NO BACKEND)
************************/
function placeOrder() {
  if (cart.length === 0) {
    alert("Your cart is empty!");
    return;
  }

  // Show thank you
  document.getElementById("thankyou").style.display = "block";

  // Clear cart
  cart = [];
  total = 0;
  updateCart();
  document.getElementById("cart-count").innerText = 0;

  // Close cart
  document.getElementById("cart-panel").classList.remove("open");

  // Scroll down
  window.scrollTo(0, document.body.scrollHeight);
}

/***********************
  FEEDBACK FORM
************************/
console.log("script.js loaded");

function openFeedback() {
  document.getElementById("feedback-modal").style.display = "block";
}

function closeFeedback() {
  document.getElementById("feedback-modal").style.display = "none";
}

function submitFeedback() {
  const name = document.getElementById("fname").value.trim();
  const email = document.getElementById("femail").value.trim();
  const mobile = document.getElementById("fmobile").value.trim();
  const feedback = document.getElementById("ffeedback").value.trim();

  if (!name || !email || !mobile || !feedback) {
    alert("Please fill all fields");
    return;
  }

  if (!email.includes("@")) {
    alert("Invalid email");
    return;
  }

  if (mobile.length !== 10) {
    alert("Invalid mobile number");
    return;
  }

  // 👉 Get old feedbacks
  const feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];

  // 👉 Add new feedback
  feedbacks.push({
    name,
    email,
    mobile,
    feedback,
    time: new Date().toLocaleString()
  });

  // 👉 Save back to localStorage
  localStorage.setItem("feedbacks", JSON.stringify(feedbacks));

  alert("Thank you for your feedback 💖");

  // Clear form
  document.getElementById("fname").value = "";
  document.getElementById("femail").value = "";
  document.getElementById("fmobile").value = "";
  document.getElementById("ffeedback").value = "";

  closeFeedback();
}
function showStoredFeedback() {
  const feedbacks = JSON.parse(localStorage.getItem("feedbacks")) || [];

  if (feedbacks.length === 0) {
    alert("No feedback found");
    return;
  }

  let output = "Stored Feedbacks:\n\n";

  feedbacks.forEach((f, i) => {
    output += `
${i + 1}. ${f.name}
Email: ${f.email}
Mobile: ${f.mobile}
Feedback: ${f.feedback}
Time: ${f.time}
-------------------------
`;
  });

  alert(output);
}
