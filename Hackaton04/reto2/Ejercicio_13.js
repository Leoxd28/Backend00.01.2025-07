const objectToArray = obj => Object.keys(obj).map(key => [key, obj[key]]);

console.log(objectToArray({
  likes: 2,
  dislikes: 3,
  followers: 10
}));