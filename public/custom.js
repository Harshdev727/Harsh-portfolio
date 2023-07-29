// Define the strings you want to type
const strings = [
"Welcome to My Portfolio!"
];

// Set up Typed.js
const typedTextElement = document.getElementById('animated-text');
const options = {
  strings: strings,
  typeSpeed: 50, // Speed of typing in milliseconds
  loop: false, // Whether to loop the typing animation
  showCursor: true,
  cursorChar: "|",
  cursorClass: 'typed-cursor'
};
const typed = new Typed(typedTextElement, options);
