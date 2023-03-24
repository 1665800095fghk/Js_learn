let counter = () => {
  let count = 0;
  return {
    count: () => count++,
    reset: () => count=0
  }
}

let f = counter();

console.log(f.count());
console.log(f.count());
console.log(f.reset());
console.log(f.count());

let join = (str) => {
  let s = "";
  return (tmp) => {
    for(let t of str)
      s += t + tmp;
    return s;
  }
}

let j = join("HelloWorld")(".");
console.log(j);