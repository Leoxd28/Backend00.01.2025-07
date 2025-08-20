const countdown = n => Array.from({length: n+1}, (_, i) => n - i);

console.log(countdown(5));