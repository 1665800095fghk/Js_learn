function isFish(animal) {
    return (typeof animal.swim === 'function')
        ? true
        : false;
}
