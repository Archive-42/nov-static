
/***********************************************************************

Let's create a constructor function to represent email messages that contains a
shared method!

Define a constructor function named `Email` that accepts four arguments that
initialize the following properties:

* recipient - the recipient of the email message
* sender - the sender of the email message
* subject - the subject for the email message
* text - the text for the email message

Additionally, add a method to the `Email` constructor function's prototype
that'll be shared across all instances. The method should be named
`getSubjectAndText()` and return the `subject` and `text` property values
formatted as "{subject}: {text}".

In addition to Mocha, we recommend that you test your code manually using
Node.js with the examples below. Use the command:

`node problems/02-constructor-function-prototype-method.js`

Examples:

const message1 = new Email('sally@smith.com', 'john@smith.com', 
  'Test Message One', 'This is a test message.');
console.log(message1);
console.log(message1.getSubjectAndText());

// Should print...

// Email {
//   recipient: 'sally@smith.com',
//   sender: 'john@smith.com',
//   subject: 'Test Message One',
//   text: 'This is a test message.'
// }
// Test Message One: This is a test message.

const message2 = new Email('sally@smith.com', 'john@smith.com', 
  'Test Message Two', 'This is a test message.');
console.log(message2);
console.log(message2.getSubjectAndText());

// Should print...

// Email {
//   recipient: 'sally@smith.com',
//   sender: 'john@smith.com',
//   subject: 'Test Message Two',
//   text: 'This is a test message.'
// }
// Test Message Two: This is a test message.

***********************************************************************/

function Email (recipient, sender, subject, text) {
  this.recipient = recipient;
  this.sender = sender;
  this.subject = subject;
  this.text = text;
}

Email.prototype.getSubjectAndText = function (subject, text) {
  return `${ this.subject }: ${ this.text }`;
};



/**************DO NOT MODIFY ANYTHING UNDER THIS LINE*****************/
try {
  module.exports = Email;
} catch {
  module.exports = null;
}
