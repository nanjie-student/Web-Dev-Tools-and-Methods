# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:
###  `npm run start`,`node server.js`
Project will run on http://localhost:4000 after build

### `npm test`

In this project directory,you can run:
`npm run dev` to test code

### Shop Website

This is a Single-Page-Application project using create-react-app about a fake cats online shopping mall. It implements the basic functions of an online shopping mall, such as adding a shopping cart, checking out, saving user address information etc.

### Security and Roles

This project allows three different roles: (users not yet logged in, logged in users, logged in admin role). 
For Admin role, please use username: `admin` and password: `admin` and click "Admin Login" button to login. 
For user, the server will only check if username is invalid or "dog", will not check or store any password.

### Add cat
For admin roles, they can add more cat's messages card after login. 

### Cart 
For logged in user, they can add cats to their cart by click "add to cart" button in main page. The server will keep storing their cart before checkout.
In cart page, users can add purchase number of cats and total price will update immediately.
In addition, the server will store users' address and card number for next purchase if they choose "save for next time".
When click checkout button,the web page will show empty cart.When we click back button,we will return cat's page.

### Image License

All picture from https://unsplash.com/




