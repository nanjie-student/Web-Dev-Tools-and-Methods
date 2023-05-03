const express = require('express');
const cookieParser = require('cookie-parser');


const app = express();
const PORT = process.env.PORT || 4000;


const cats = require('./cats');
const sessions = require('./sessions');
const users = require('./users');
const userData = require('./userData')
const catList = cats.makeCatList();

app.use(cookieParser());
app.use(express.static('./build'));
app.use(express.json());


// Sessions
app.get('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  res.json({ username });
});

app.post('/api/session', (req, res) => {
  const { username } = req.body;

  if (!users.isValid(username)) {
    res.status(400).json({ error: 'required-username' });
    return;
  }

  if (username === 'dog' || username === 'admin') {
    res.status(403).json({ error: 'auth-insufficient' });
    return;
  }

  const sid = sessions.addSession(username);
  const existingUserData = users.getUserData(username);

  if (!existingUserData) {
    users.addUserData(username, userData.makeUserData());
  }

  const data = {
    cart: users.getUserData(username).getCart().getCats(),
    address: users.getUserData(username).getUserData().address,
    cardNumber: users.getUserData(username).getUserData().cardNumber,
    totalPrice: users.getUserData(username).getCart().getTotalPrice()
  }

  res.cookie('sid', sid);

  res.json(data);
});

app.post('/api/admin', (req, res) => {
  const { username, code } = req.body;

  if (username != 'admin' || code != 'admin') {
    res.status(403).json({ error: 'auth-insufficient' });
    return;
  }
  const sid = sessions.addSession(username);

  const existingUserData = users.getUserData(username);

  if (!existingUserData) {
    users.addUserData(username, userData.makeUserData());
  }

  res.cookie('sid', sid);

  res.json({ username })

})

app.delete('/api/session', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';

  if (sid) {
    res.clearCookie('sid');
  }

  if (username) {
    sessions.deleteSession(sid);
  }

  res.json({ username });
});

app.get('/api/cats', (req, res) => {
  res.json(catList.getCats());
});

app.post('/api/cats', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || username != 'admin') {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { name, price, image, type } = req.body;
  catList.addCat(name, price, image, type);
  res.json(catList.getCats());

});

app.get('/api/checkout', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  users.getUserData(username).getCart().checkout();
  res.json(users.getUserData(username).getCart().getCats())
});

app.get('/api/totalPrice', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  res.json(users.getUserData(username).getCart().getTotalPrice());
});

app.delete('/api/delCart/:id', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { id } = req.params;
  users.getUserData(username).getCart().deleteCat(id);

  const data = {
    cart: users.getUserData(username).getCart().getCats(),
    totalPrice: users.getUserData(username).getCart().getTotalPrice()
  }
  res.json(data);
});

app.get('/api/userData', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }

  const data = {
    cart: users.getUserData(username).getCart().getCats(),
    address: users.getUserData(username).getUserData().address,
    cardNumber: users.getUserData(username).getUserData().cardNumber,
    totalPrice: users.getUserData(username).getCart().getTotalPrice()
  }

  res.json(data);
});

app.post('/api/updateInformation', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { address, cardNumber } = req.body;
  const userData = users.getUserData(username);
  userData.updateInformation(address, cardNumber)
  res.json(userData.getUserData());

});

app.post('/api/addCart/', (req, res) => {
  const sid = req.cookies.sid;
  const username = sid ? sessions.getSessionUser(sid) : '';
  if (!sid || !users.isValid(username)) {
    res.status(401).json({ error: 'auth-missing' });
    return;
  }
  const { id } = req.body;

  if (!catList.contains(id)) {
    res.status(404).json({ error: `noSuchId`, message: `No cat with id ${id}` });
    return;
  }
  const targetProduct = catList.getCat(id);
  users.getUserData(username).getCart().addCat(id, targetProduct.name, targetProduct.price, targetProduct.image, targetProduct.product_type)
  const data = {
    cart: users.getUserData(username).getCart().getCats(),
    totalPrice: users.getUserData(username).getCart().getTotalPrice()
  }

  res.json(data);
});

app.listen(PORT, console.log(`http://localhost:${PORT}`));