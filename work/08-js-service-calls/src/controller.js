const react = require("./react.js");
const storage = require("./storage");

const controller = {
  user: {
    fetchSession() {
      storage.username = undefined;
      storage.wordList = undefined;
      return fetch("/api/session")
        .catch((err) => {
          return Promise.reject(err);
        })
        .then((res) => {
          if (!res.ok) {
            return Promise.reject({ err: "Invalid User" });
          }
          return res.json();
        })
        .then((res) => {
          storage.username = res.username;
          return controller.word.fetchWord();
        })
        .then((res) => {
          storage.wordList = res.storedWord;
        });
    },

    fetchLogin(username) {
      const session = fetch("/api/session/", {
        method: "PUT",
        headers: {
          "content-type": "application/json", // set this header when sending JSON in the body of request
        },
        body: JSON.stringify({ username }),
      })
        .catch((err) => {
          storage.errMsg = "Network Error, try again";
          return Promise.reject({ error: "network-error" });
        })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((err) => {
              storage.errMsg = "Invalid Credential, try again";
              react.render();
              return Promise.reject(err);
            });
          }
          return response.json();
        })
        .then((response) => {
          storage.username = response.username;
        });
      return session;
    },

    fetchLogout() {
      const session = fetch("/api/session/", {
        method: "DELETE",
        headers: {
          "content-type": "application/json", // set this header when sending JSON in the body of request
        },
      }).catch((err) => Promise.reject({ error: "network-error" }));
      return session;
    },
  },
  word: {
    fetchWord() {
      return fetch("/api/word", {
        method: "GET",
      })
        .catch((err) => {
          storage.errMsg = "Network Error, try again";
        })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((err) => {
              storage.errMsg = "Error fetching words, try again";
              return Promise.reject(err);
            });
          }
          return response.json();
        });
    },

    addWord(word) {
      return fetch("/api/word", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({ word }),
      })
        .catch((err) => {
          storage.errMsg = "Network Error, try again";
          return Promise.reject(err);
        })
        .then((response) => {
          if (!response.ok) {
            return response.json().then((err) => {
              storage.errMsg = `Error adding word ${word}, try again`;
            });
          }
          return response.json();
        })
        .then((response) => (storage.wordList = response.storedWord));
    },
  },

  initEventListener() {
    const appEl = document.querySelector("#app");
    appEl.addEventListener("click", (e) => {
      e.preventDefault();
      storage.errMsg = "";
      switch (e.target.className) {
        case "username-submit":
          const usernameEl = document.querySelector(".username-input");
          controller.user
            .fetchLogin(usernameEl.value)
            .then(() => controller.word.fetchWord())
            .then(() => react.render());
          break;
        case "logout":
          controller.user.fetchLogout().then(() => {
            storage.username = undefined;
            storage.wordList = [];
            react.render();
          });
          break;
        case "word-submit":
          const wordInputEl = document.querySelector(".word-input");
          controller.word
            .addWord(wordInputEl.value)
            .then(() => controller.word.fetchWord())
            .then(() => react.render());
          break;
        default:
          break;
      }
    });
  },
};
module.exports = controller;
