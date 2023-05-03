'use strict';
const express = require('express');
const cookieParser = require('cookie-parser');
const uuid = require('uuid');
const session = require('express-session');

const app = express();
const PORT = 3000;
const sessionStore = {}; // object to store session data
const wordStore = {}; // object to store user's stored word

app.use(express.static('./public'));
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: true
}));


app.get('/', (req, res) => {
  const sessionId = req.cookies.sid;
  if (sessionId && sessionStore[sessionId]) {
    // user is already logged in, so show the data page
    const username = sessionStore[sessionId].username;
    const storedWord = wordStore[username] || ''; // get user's stored word or empty string if none exists
    res.send(
    `<!DOCTYPE html>
    <html>
    <head>
      <title>My App - Data Page</title>
      <meta charset="utf-8">
      <link rel="stylesheet" href="css/styles.css">
    </head>
    <body>
      <header>
      </header>
      <main>
        <h1>Welcome fix your messages</h1>
        <p>Your stored word is: <span id="stored-word">${storedWord}</span></p>
        <form action="/change-word" method="post" >
          <label for="new-words">Enter a new stored word:</label>
          <input type="text" id="new-words" name="new-words">
          <button type="submit">Save</button>
        </form>
        <form action="/logout" method="post" >
        <button type="submit">Logout</button>
        </form>
      </main>
      <footer>
        We really don't care about your privacy,see our <a href="privacy.html">Privacy Policy</a>
      </footer>
    </body>
    </html>
    `);
  } else {
    // user is not logged in, so show the login page
    res.send(
    `
    <!DOCTYPE html>
      <html>
        <head>
        <title>My App - Data Page</title>
        <meta charset="utf-8">
        <link rel="stylesheet" href="css/styles.css">
        </head>
        <body>
          <header>
            <h1>Login Form</h1>
          </header>
          <main>
            <form action="/login" method="post">
              <label class="name" for="username">Username:</label>
              <input type="text" id="username" name="username" required>
              <br><br>
              <label class="password" for="password">Password:</label>
              <input type="text" id="password" name="password">
              <br><br>
              <button type="submit">Login</button>
            </form>
          </main>
          <footer>
            We really don't care about your privacy,see our <a href="privacy.html">Privacy Policy</a>
          </footer>
        </body>
      </html>
    `
    );
  }
});
//login if username is invalid 
//login if username doesn't exit ,create a session id
app.post('/login', (req, res) => {
  const { username } = req.body;
  if (!username || username === 'dog' || !/^[a-zA-Z0-9]+$/.test(username)) {
    res.status(401).send(
    `
    <p>Invalid username. Please enter a username consisting of letters and numbers only.</p>
    <a href="/">Go back to login form</a>
    `);
  } else {
    const sessionId = uuid.v4();
    sessionStore[sessionId] = { username, storedWord: wordStore[username] || ''};
    res.cookie('sid', sessionId);
    res.redirect('/');
  }
});
app.post('/change-word',(req,res) =>{
  const sessionId = req.cookies.sid;
  if(!sessionId || !sessionStore[sessionId]){
    res.redirect('/');
  }else{
    const {'new-words': newWords} = req.body;
    const username = sessionStore[sessionId].username;
    wordStore[username] = newWords;
    res.redirect('/');
  }
})
app.post('/logout', (req, res) => {
  const sessionId = req.cookies.sid;
  if (sessionId && sessionStore[sessionId]) {
    const { username } = sessionStore[sessionId];
    delete sessionStore[sessionId];
    delete wordStore[username]; // clear stored word
    res.clearCookie('sid');
  }
  res.redirect('/');
});

app.post('/store-word', (req, res) => {
  const sessionId = req.cookies.sid;
  if (!sessionId || !sessionStore[sessionId]) {
    res.redirect('/');
  } else {
    const { word } = req.body;
    const username = sessionStore[sessionId].username;
    wordStore[username] = word;
    res.redirect('/');
  }
});
app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));