interface Cat {
  name: string;
  run(): void;
}
interface Fish {
  name: string;
  swim(): void;
}
function isFish(animal: Cat | Fish) {
  return (typeof (animal as Fish).swim === 'function')
    ? true
    : false;
}