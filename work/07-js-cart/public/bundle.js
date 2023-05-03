/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/state.js":
/*!**********************!*\
  !*** ./src/state.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__),
/* harmony export */   "pages": () => (/* binding */ pages)
/* harmony export */ });
var PAGES = {
  PRODUCTS: 'products',
  CART: 'cart'
};
var state = {
  products: [{
    name: 'Fluffball',
    img: "http://placekitten.com/150/150?image=1",
    price: '$0.99'
  }, {
    name: 'General Mayhem',
    img: "http://placekitten.com/150/150?image=2",
    price: '$3.14'
  }, {
    name: 'Meow is the time',
    img: "http://placekitten.com/150/150?image=3",
    price: '$2.73'
  }],
  cart: [],
  page: PAGES.PRODUCTS
};
var pages = PAGES;
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (state);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./src/cart.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _state__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./state */ "./src/state.js");




(function () {
  var appEl = document.querySelector("#app");

  //check render status
  function render() {
    if (_state__WEBPACK_IMPORTED_MODULE_0__["default"].page === _state__WEBPACK_IMPORTED_MODULE_0__.pages.PRODUCTS) {
      renderProducts();
    }
    if (_state__WEBPACK_IMPORTED_MODULE_0__["default"].page === _state__WEBPACK_IMPORTED_MODULE_0__.pages.CART) {
      renderCart();
    }
  }

  //render cart page
  function renderCart() {
    var cartHtml;
    var total = 0;
    if (_state__WEBPACK_IMPORTED_MODULE_0__["default"].cart.length === 0) {
      cartHtml = "<p>Nothing in the cart</p>";
    } else {
      cartHtml = _state__WEBPACK_IMPORTED_MODULE_0__["default"].cart.map(function (product, index) {
        total += product.quantity * parseFloat(product.price.slice(1));
        return "\n        <div class=\"cart_product\">\n          <img src=\"".concat(product.img, "\" alt=\"").concat(product.name, "\">\n          <div class=\"info\">\n            <h2>").concat(product.name, "</h2>\n            <p>").concat(product.price, "</p>\n            <input type=\"number\" value=\"").concat(product.quantity, "\" data-index=\"").concat(index, "\">\n          </div>\n        </div>\n      ");
      }).join("");
    }
    appEl.innerHTML = "  \n     <div class=\"btn\">\n        <button type=\"button\" class=\"page\" data-target=\"products\">\n          Hide Cart\n        </button>\n        <button type=\"button\" class=\"checkout\">\n          Checkout\n        </button>\n      </div>\n      <div class=\"products\">\n        ".concat(cartHtml, "\n        <div class=\"total_cost\">\n          <p>Total: $").concat(total.toFixed(2), "</p>\n        </div>\n      </div>\n    ");
    var checkoutButton = document.querySelector(".checkout");
    checkoutButton.addEventListener("click", function () {
      _state__WEBPACK_IMPORTED_MODULE_0__["default"].cart = [];
      renderCart();
    });
    var quantityInputs = document.querySelectorAll('input[type="number"]');
    quantityInputs.forEach(function (input) {
      input.addEventListener("change", function () {
        var index = input.dataset.index;
        var product = _state__WEBPACK_IMPORTED_MODULE_0__["default"].cart[index];
        var quantity = parseInt(input.value);
        if (quantity > 0) {
          product.quantity = quantity;
        } else {
          _state__WEBPACK_IMPORTED_MODULE_0__["default"].cart.splice(index, 1);
        }
        renderCart();
      });
    });
  }
  function renderProducts() {
    var listHtml = _state__WEBPACK_IMPORTED_MODULE_0__["default"].products.map(function (product, index) {
      return "\n        <div class=\"product\">\n          <img src=\"".concat(product.img, "\" alt=\"").concat(product.name, "\">\n          <div class=\"product_info\">\n            <h2>").concat(product.name, "</h2>\n            <p>").concat(product.price, "</p>\n            <button class=\"add_to_cartbtn\" data-index=\"").concat(index, "\">Add to Cart</button>\n          </div>\n        </div>\n      ");
    }).join("");
    appEl.innerHTML = " \n    <div class=\"products\">\n        ".concat(listHtml, "\n    </div> \n     <div class=\"btn\">\n        <button type=\"button\" class=\"page\" data-target=\"cart\">\n        View Cart\n        </button>\n      </div>\n    ");
    var addToCartButton = document.querySelectorAll(".add_to_cartbtn");
    addToCartButton.forEach(function (button) {
      button.addEventListener("click", function () {
        var index = button.dataset.index;
        var product = _state__WEBPACK_IMPORTED_MODULE_0__["default"].products[index];
        var addedItem = _state__WEBPACK_IMPORTED_MODULE_0__["default"].cart.find(function (item) {
          return item.name === product.name;
        });
        if (addedItem) {
          addedItem.quantity += 1;
        } else {
          _state__WEBPACK_IMPORTED_MODULE_0__["default"].cart.push({
            name: product.name,
            price: product.price,
            img: product.img,
            quantity: 1
          });
        }
      });
    });
    var viewCartButton = document.querySelector('[data-target="cart"]');
    viewCartButton.addEventListener("click", function () {
      _state__WEBPACK_IMPORTED_MODULE_0__["default"].page = _state__WEBPACK_IMPORTED_MODULE_0__.pages.CART;
      render();
    });
  }
  render();
  appEl.addEventListener("click", function (e) {
    if (e.target.classList.contains("page")) {
      _state__WEBPACK_IMPORTED_MODULE_0__["default"].page = e.target.dataset.target;
      render();
    }
  });
})();
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map