var Freshness;
(function (Freshness) {
    function logName(something) {
        console.log(something.name);
    }
    const person = { name: 'matt', job: 'being awesome' };
    const animal = { name: 'cow', diet: 'vegan, but has milk of own specie' };
    logName(person);
    logName(animal);
})(Freshness || (Freshness = {}));
