const controller = require("./controller.js");
const react = require("./react.js");
controller.initEventListener();
controller.user.fetchSession().then(() => react.render()); // Render for a resumed session
react.render(); // Render for a new session