const filtrarStrings = arr => arr.filter(item => typeof item === 'string');

console.log(filtrarStrings([1, 'a', 'b', 2, true, 'c']));