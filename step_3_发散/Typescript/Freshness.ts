namespace Freshness {
  function logName(something: { name: string }) {
    console.log(something.name);
  }
  const person = { name: 'matt', job: 'being awesome' };
  const animal = { name: 'cow', diet: 'vegan, but has milk of own specie' };
  logName(person); // ok
  logName(animal); // ok
}