const users = { // Yes, an object!  Keep it as one
  "Amit": "Amit", // The keys let you check to see if the user is logged in
  "Bao": "Bao",  // the values don't really matter, here we reuse the username, but it could be `true`
};


const messages = [
  {
    sender: "Amit",
    text: "You up?",
  },
  {
    sender: "Bao",
    text: "Yeah, still working on this INFO6250 work, but I keep getting distracted by cat videos",
  },
  {
    sender:"Amit",
    text:"How 's going,Bao?",
  },
  {
    sender: "Bao",
    text:"So bad...",
  },
  {
    sender:"Amit",
    text:  "Why? What happened ?",
  },
  {
    sender: "Bao",
    text: "The assignment is very hard ,I have no idea about it",
  }

];

// Below uses destrucuring
function addMessage({sender, text }) { // Leave this as `sender` - I want to see you solve the name disagreement
  // Fill in!
  const senderName = sender;
  const senderText = text;
  const newMessages = {
    sender: senderName,
    text : senderText
  };
  messages.push(newMessages);
   
}



const chat = {
  users,
  messages,
  addMessage,
};

module.exports = chat;

