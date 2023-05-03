'use strict';
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser');
const uuid = require('uuid');
const words = require('./words.js'); // Import the words array from word.js

const PORT = process.env.PORT || 3000;
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

// Object to connect sessions to usernames
const sessions = {};
// Object to connect usernames to game state
const games = {};
// Allowlist of valid characters for username
const allowedUsername = /^[a-zA-Z0-9_]+$/;

function maskWord(word, guesses) {
    if (!word) {
      return "";
    }
    const maskedWord = word
      .split("")
      .map((letter) => (guesses.includes(letter) ? letter : "_"))
      .map((letter) => (letter === " " ? " " : "_"))
      .join(" ");
    return maskedWord.trim();
}
function createGame(username) {
    if (games[username]) {
      return games[username];
    }
    const wordList = [...words];
    const word = wordList.splice(Math.floor(Math.random() * wordList.length), 1)[0];
    const guesses = [];
    const game = {
      word: word,
      guesses: guesses,
      incorrectGuesses: 0,
      wordList: wordList,
      previousGuessCorrect: null,
    };
    games[username] = game;
    return game;
}
// Home page
app.get('/', (req, res) => {
  const { sid } = req.cookies;
  if (sid && sessions[sid]) {
    // If user has a valid session id, show game state
    const username = sessions[sid];
    const game = games[username] || createGame(username);
    let message = '';
    if (game.previousGuessCorrect === true) {
      message = 'Congratulations, you won!';
    } else if (game.previousGuessCorrect === false) {
      message = `Incorrect guess. The secret word was "${game.word}".`;
    } else if (game.previousGuessCorrect === null && game.incorrectGuesses > 0) {
      message = `Invalid guess "${game.currentGuess}".`;
    } else if (game.incorrectGuesses === 6) {
      message = `Game over. The secret word was "${game.word}".`;
    } else if (game.incorrectGuesses > 0) {
      message = `${6 - game.incorrectGuesses} guesses remaining.`;
    }
    const maskedWord = maskWord(game.word, game.guesses);
    const previousGuesses = game.guesses.join(", ");
    res.send(`
      <!DOCTYPE html>
      <html>
        <head>
          <title>Guess Game</title>
          <link rel="stylesheet" type="text/css" href="/css/styles.css">
        </head>
        <body>
		<header>
			<h1>Game:</h1>
		</header>
		<main>
			<p>Welcome, ${username}!</p>
			<p>${maskedWord}</p>
			<p>${message}</p>
			<form method="POST" action="/guess">
			<label for="guess">Guess a letter:</label>
			<input type="text" id="guess" name="guess" pattern="[A-Za-z]{5}" maxlength="5" required>
			<button type="submit">Guess</button>
			</form>
			<p>Previous guesses: ${previousGuesses}</p>
			<form method="POST" action="/logout">
			<button type="submit">Log out</button>
			</form>
		</main>
		<footer> 
			We really don't care about your privacy,see our <a href="privacy.html">Privacy Policy</a>
		</footer>
        </body>
      </html>
    `);
} else {
    // If user does not have a valid session id, show login page
	res.send(
	`
	<!DOCTYPE html>
	<html>
	  <head>
	    <title>Login page</title>
	    <link rel="stylesheet" type="text/css" href="/css/styles.css">
	  </head>
	  <body>
		<header>
		<h1>Game</h1>
		</header>
	    <main>
			<form method="POST" action="/login">
			<label for="username">Enter a username:</label>
			<input type="text" id="username" name="username" required>
			<button type="submit">Register</button>
			<button type="submit">Log in</button>
			</form>
		</main>
	    <footer> 
			We really don't care about your privacy,see our <a href="privacy.html">Privacy Policy</a>
		</footer>
	  </body>
	</html>
	`);
  }
});
// 登录路由
app.post('/login', (req, res) => {
	const { username } = req.body;
	// Check if username is valid
	if (!allowedUsername.test(username) || username === 'dog') {
		res.send(
		`
		<!DOCTYPE html>
		<html> 
			<head> 
				<title>My App - Login Page</title> 
				<meta charset="utf-8">
				<link rel="stylesheet" href="css/styles.css"> 
			</head>
			<body> 
				<header> 
					<h1>Invalid username</h1> 
				<header> 
				<main> 
					<form method="POST" action="/login">
						<p>Invalid username. Please enter a valid username.</p> 
						<label>Username:</label> 
						<input type="text" name="username" /> 
						<button type="submit">Register</button> 
						<button type="submit">Login</button> 
					</form>
				</main> 
				<footer> 
				We really don't care about your privacy,see our <a href="privacy.html">Privacy Policy</a>
				</footer>
			</body> 
		</html> 
		` );
	return;
	}
	// Check if user already has a session
	const { sid } = req.cookies;
	if (sid && sessions[sid]) {
		res.redirect('/');
		return;
	}
	// Create a new session
	const newSid = uuid.v4();
	sessions[newSid] = username;
	res.cookie('sid', newSid);
	res.redirect('/');
});
// 登出路由
app.post('/logout', (req, res) => {
  // 查找当前会话，并将其从会话存储中删除
  const sid = req.cookies.sid;
  if (sid) {
    delete sessions[sid];
  }
  res.clearCookie('sid'); // 从cookie中删除sid
  res.redirect('/');
});
// 进行guess的路由
app.post('/guess', (req, res) => {
	const { sid } = req.cookies;
	const username = sessions[sid];
	const game = games[username];
	const guess = req.body.guess;
	// Only accept guess if user is logged in
	if (!sid || !sessions[sid]) {
		res.redirect('/');
		return;
	}
	// Only accept guess if it hasn't been made before
	if (game.guesses.includes(guess)) {
		game.previousGuessCorrect = null;
		res.redirect('/');
		return;
	}
	game.guesses.push(guess);
	if (game.word.includes(guess)) {
		game.previousGuessCorrect = true;
	} else {
		game.incorrectGuesses += 1;
		game.previousGuessCorrect = false;
	}
	// Check if the user has won
	if (maskWord(game.word, game.guesses).replace(/\s/g, '') === game.word) {
		res.cookie('sid', '', { maxAge: -1 });
		delete games[username];
		res.send(`
		<!DOCTYPE html>
		<html>
		<head>
			<title>My App - Game</title>
			<meta charset="utf-8">
			<link rel="stylesheet" href="css/styles.css">
		</head>
		<body>
			<header>
			  <h1>Game page</h1>
			  <p>Congratulations, ${username}! You won!</p>
			</header>
			<main>
			  <form method="POST" action="/newgame">
				  <button type="submit">New Game</button> 
			  </form>
			  <form method="POST" action="/logout">
				<button type="submit">Logout</button>
			  </form>
			</main>
			<footer>
				We really don't care about your privacy,see our <a href="privacy.html">Privacy Policy</a>
			</footer>
		</body>
    </html>
    `);
	return;
	}
	// Check if the user has lost
	if (game.incorrectGuesses === 6) {
		res.cookie('sid', '', { maxAge: -1 });
		delete games[username];
		res.send(`
		<!DOCTYPE html>
		<html>
		  <head>
			<title>My App - Game</title>
			<meta charset="utf-8">
			<link rel="stylesheet" href="css/styles.css">
		  </head>
		  <body>
			<header>
			  <h1>Game page</h1>
			  <p>Sorry, ${username}, you lost. The secret word was "${game.word}".</p>
			</header>
			<main>
			  <form method="POST" action="/newgame">
				  <button type="submit">New Game</button> 
			  </form>
			  <form method="POST" action="/logout">
				<button type="submit">Logout</button>
			  </form>
			</main>
			<footer>
			We really don't care about your privacy,see our <a href="privacy.html">Privacy Policy</a>
			</footer>
		  </body>
		</html>
	`);
	return;
	}
	res.redirect('/');
});
// Endpoint to create new game
app.post('/newgame', (req, res) => {
	const { sid } = req.cookies;
	const username = sessions[sid];
	games[username] = createGame(username);
	res.redirect('/');
});

app.listen(PORT, () => console.log(`Listening on http://localhost:${PORT}`));