const chatWeb = {
  chatPage: function(chat) {
    // Fill in/modify anything below!
    return `
      <!doctype html>
      <html>
        <head>
          <title>Chat</title>
          <link rel="stylesheet" href="styles.css">
        </head>
        <body>
          <h1>Chat</h1>
          <div id="chat-app">
            <div class="userlist">
            <h2>Users List</h2>
            ${chatWeb.getUserList(chat)}
            </div>
            <div class="chatlist">
            <h2>Chat List</h2>
            ${chatWeb.getMessageList(chat)}
            </div>
            <div class="formpart">
            ${chatWeb.getOutgoing(chat)}
            </div>
            
          </div>
        </body>
      </html>
  `;
  },

  getMessageList: function(chat) {
    const messages = chat.messages;
    return `<ol class="messages">` +
      // Fill in
      // Generate the HTML for the list of messages
      messages.map(message => {           
        const sender = message.sender;
        const text = message.text;
        const avatarText = `avatar of ${sender}`;
        const avatarUrl = `image/avatar-${sender}.jpg`;
        return`
          <li>
            <div class="message">
              <div class="sender-info">
                <img class="avatar" alt="${avatarText}" src="${avatarUrl}"/>
                <span class="username">${sender}</span>
              </div>
              <p class="message-text">${text}</p>
            </div>
          </li>`;
        
      }).join('')+ `</ol>`;
  },

  getUserList: function(chat) {
    return `<ul class="users">` +
    Object.values(chat.users).map( user => `
    <li>
      <div class="user">
        <span class="username">${user}</span>
      </div>
    </li>
    `).join('') +
    `</ul>`;
  },
  getOutgoing: function() {
    // Fill in
    // Generate the HTML for a form to send a message
    return `
    <form action="/chat" method="POST">
      <input type="hidden" name="sender" value="Yourusername">
      <input type="text" name="text" placeholder="Enter message to send"/>
      <button type="submit">Send</button>
    </form> 
    `;   
  }
};
module.exports = chatWeb;
