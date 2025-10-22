const map = new Map();
module.exports = {
  get: (k) => map.get(k),
  set: (k, v) => map.set(k, v),
  all: () => Array.from(map.entries()),
};
