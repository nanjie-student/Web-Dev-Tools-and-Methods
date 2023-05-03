/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/controller.js":
/*!***************************!*\
  !*** ./src/controller.js ***!
  \***************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var react = __webpack_require__(/*! ./react.js */ "./src/react.js");
var storage = __webpack_require__(/*! ./storage */ "./src/storage.js");
var controller = {
  user: {
    fetchSession: function fetchSession() {
      storage.username = undefined;
      storage.wordList = undefined;
      return fetch("/api/session")["catch"](function (err) {
        return Promise.reject(err);
      }).then(function (res) {
        if (!res.ok) {
          return Promise.reject({
            err: "Invalid User"
          });
        }
        return res.json();
      }).then(function (res) {
        storage.username = res.username;
        return controller.word.fetchWord();
      }).then(function (res) {
        storage.wordList = res.storedWord;
      });
    },
    fetchLogin: function fetchLogin(username) {
      var session = fetch("/api/session/", {
        method: "PUT",
        headers: {
          "content-type": "application/json" // set this header when sending JSON in the body of request
        },

        body: JSON.stringify({
          username: username
        })
      })["catch"](function (err) {
        storage.errMsg = "Network Error, try again";
        return Promise.reject({
          error: "network-error"
        });
      }).then(function (response) {
        if (!response.ok) {
          return response.json().then(function (err) {
            storage.errMsg = "Invalid Credential, try again";
            react.render();
            return Promise.reject(err);
          });
        }
        return response.json();
      }).then(function (response) {
        storage.username = response.username;
      });
      return session;
    },
    fetchLogout: function fetchLogout() {
      var session = fetch("/api/session/", {
        method: "DELETE",
        headers: {
          "content-type": "application/json" // set this header when sending JSON in the body of request
        }
      })["catch"](function (err) {
        return Promise.reject({
          error: "network-error"
        });
      });
      return session;
    }
  },
  word: {
    fetchWord: function fetchWord() {
      return fetch("/api/word", {
        method: "GET"
      })["catch"](function (err) {
        storage.errMsg = "Network Error, try again";
      }).then(function (response) {
        if (!response.ok) {
          return response.json().then(function (err) {
            storage.errMsg = "Error fetching words, try again";
            return Promise.reject(err);
          });
        }
        return response.json();
      });
    },
    addWord: function addWord(word) {
      return fetch("/api/word", {
        method: "POST",
        headers: {
          "content-type": "application/json"
        },
        body: JSON.stringify({
          word: word
        })
      })["catch"](function (err) {
        storage.errMsg = "Network Error, try again";
        return Promise.reject(err);
      }).then(function (response) {
        if (!response.ok) {
          return response.json().then(function (err) {
            storage.errMsg = "Error adding word ".concat(word, ", try again");
          });
        }
        return response.json();
      }).then(function (response) {
        return storage.wordList = response.storedWord;
      });
    }
  },
  initEventListener: function initEventListener() {
    var appEl = document.querySelector("#app");
    appEl.addEventListener("click", function (e) {
      e.preventDefault();
      storage.errMsg = "";
      switch (e.target.className) {
        case "username-submit":
          var usernameEl = document.querySelector(".username-input");
          controller.user.fetchLogin(usernameEl.value).then(function () {
            return controller.word.fetchWord();
          }).then(function () {
            return react.render();
          });
          break;
        case "logout":
          controller.user.fetchLogout().then(function () {
            storage.username = undefined;
            storage.wordList = [];
            react.render();
          });
          break;
        case "word-submit":
          var wordInputEl = document.querySelector(".word-input");
          controller.word.addWord(wordInputEl.value).then(function () {
            return controller.word.fetchWord();
          }).then(function () {
            return react.render();
          });
          break;
        default:
          break;
      }
    });
  }
};
module.exports = controller;

/***/ }),

/***/ "./src/react.js":
/*!**********************!*\
  !*** ./src/react.js ***!
  \**********************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var controller = __webpack_require__(/*! ./controller.js */ "./src/controller.js");
var storage = __webpack_require__(/*! ./storage.js */ "./src/storage.js");
var react = {
  render: function render() {
    react.renderUserStatus();
    react.renderErrMsg();
    react.renderLoginForm();
    react.renderWordForm();
  },
  renderUserStatus: function renderUserStatus() {
    var userEl = document.querySelector(".user");
    var isLoggedIn = storage.username !== undefined;
    var loginHTML = "<a href=\"\" class=\"login\">Log In</a>";
    var logoutHTML = "<a href=\"\" class=\"logout\">Log out</a>";
    userEl.innerHTML = isLoggedIn ? logoutHTML : loginHTML;
  },
  renderLoginForm: function renderLoginForm() {
    var loginEl = document.querySelector(".login-form");
    if (!storage.username) {
      loginEl.innerHTML = "\n          <form action=\"\">\n              <label>Username: <input type=\"text\" class=\"username-input\"></label>\n              <button type=\"submit\" class=\"username-submit\">Submit</button>\n          </form>\n          ";
    } else {
      loginEl.innerHTML = "";
    }
  },
  renderWordForm: function renderWordForm() {
    var wordList = storage.wordList;
    var wordEl = document.querySelector(".words");
    if (storage.username) {
      var wordListHTML = wordList ? "<p>Your word is ".concat(wordList, " </p>") : "<p>You do not have any word</p>";
      var wordInputHTML = "\n    <form action=\"\">\n      <label>\n        Update word: <input type=\"text\" class=\"word-input\"></input>\n      </label>\n      <button class='word-submit' type=\"submit\">Submit</button>\n    </form>";
      wordEl.innerHTML = [wordListHTML, wordInputHTML].join("");
    } else {
      wordEl.innerHTML = "";
    }
  },
  renderErrMsg: function renderErrMsg() {
    var errorMsgEl = document.querySelector(".error-msg");
    if (storage.errMsg) {
      errorMsgEl.innerHTML = "<p>".concat(storage.errMsg, "</p>");
    } else {
      errorMsgEl.innerHTML = "";
    }
  }
};
module.exports = react;

/***/ }),

/***/ "./src/storage.js":
/*!************************!*\
  !*** ./src/storage.js ***!
  \************************/
/***/ ((module) => {

var storage = {
  username: undefined,
  wordList: undefined,
  errMsg: ""
};
module.exports = storage;

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
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
var controller = __webpack_require__(/*! ./controller.js */ "./src/controller.js");
var react = __webpack_require__(/*! ./react.js */ "./src/react.js");
controller.initEventListener();
controller.user.fetchSession().then(function () {
  return react.render();
}); // Render for a resumed session
react.render(); // Render for a new session
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map