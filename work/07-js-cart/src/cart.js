"use strict";
import state from "./state";
import { pages } from "./state";

(function () {
  const appEl = document.querySelector("#app");

  //check render status
  function render() {
    if (state.page === pages.PRODUCTS) {
      renderProducts();
    }
    if (state.page === pages.CART) {
      renderCart();
    }
  }

  //render cart page
  function renderCart() {
    let cartHtml;
    let total = 0;
    if (state.cart.length === 0) {
      cartHtml = "<p>Nothing in the cart</p>";
    } else {
      cartHtml = state.cart.map((product, index) => {
          total += product.quantity * parseFloat(product.price.slice(1));

        return `
        <div class="cart_product">
          <img src="${product.img}" alt="${product.name}">
          <div class="info">
            <h2>${product.name}</h2>
            <p>${product.price}</p>
            <input type="number" value="${product.quantity}" data-index="${index}">
          </div>
        </div>
      `;
        })
        .join("");
    }

    appEl.innerHTML = `  
     <div class="btn">
        <button type="button" class="page" data-target="products">
          Hide Cart
        </button>
        <button type="button" class="checkout">
          Checkout
        </button>
      </div>
      <div class="products">
        ${cartHtml}
        <div class="total_cost">
          <p>Total: $${total.toFixed(2)}</p>
        </div>
      </div>
    `;

    const checkoutButton = document.querySelector(".checkout");
      checkoutButton.addEventListener("click", () => {
      state.cart = [];
      renderCart();
    });

    const quantityInputs = document.querySelectorAll('input[type="number"]');
    quantityInputs.forEach((input) => {
      input.addEventListener("change", () => {
        const index = input.dataset.index;
        const product = state.cart[index];
        const quantity = parseInt(input.value);
        if (quantity > 0) {
          product.quantity = quantity;
        } else {
          state.cart.splice(index, 1);
        }
        renderCart();
      });
    });
  }

  function renderProducts() {
    const listHtml = state.products
      .map((product, index) => {
        return `
        <div class="product">
          <img src="${product.img}" alt="${product.name}">
          <div class="product_info">
            <h2>${product.name}</h2>
            <p>${product.price}</p>
            <button class="add_to_cartbtn" data-index="${index}">Add to Cart</button>
          </div>
        </div>
      `;
      })
      .join("");

    appEl.innerHTML = ` 
    <div class="products">
        ${listHtml}
    </div> 
     <div class="btn">
        <button type="button" class="page" data-target="cart">
        View Cart
        </button>
      </div>
    `;
    const addToCartButton = document.querySelectorAll(".add_to_cartbtn");
    addToCartButton.forEach((button) => {
      button.addEventListener("click", () => {
        const index = button.dataset.index;
        const product = state.products[index];
        const addedItem = state.cart.find(
          (item) => item.name === product.name
        );
        if (addedItem) {
          addedItem.quantity += 1;
        } else {
          state.cart.push({
            name: product.name,
            price: product.price,
            img: product.img,
            quantity: 1,
          });
        }
      });
    });

    const viewCartButton = document.querySelector('[data-target="cart"]');
    viewCartButton.addEventListener("click", () => {
      state.page = pages.CART;
      render();
    });
  }
  render();

  appEl.addEventListener("click", (e) => {
    if (e.target.classList.contains("page")) {
      state.page = e.target.dataset.target;
      render();
    }
  });
})();