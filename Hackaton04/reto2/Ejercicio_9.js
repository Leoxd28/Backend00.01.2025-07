const charIndex = (str, char) => [str.indexOf(char), str.lastIndexOf(char)];

console.log(charIndex("hello", "l")); 
console.log(charIndex("circumlocution", "c"));