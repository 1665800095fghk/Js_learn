var AnimalFlags;
(function (AnimalFlags) {
    AnimalFlags[AnimalFlags["None"] = 0] = "None";
    AnimalFlags[AnimalFlags["HasClaws"] = 1] = "HasClaws";
    AnimalFlags[AnimalFlags["CanFly"] = 2] = "CanFly";
})(AnimalFlags || (AnimalFlags = {}));
function printAnimalAbilities(animal) {
    let animalFlags = animal.flags;
    (animalFlags & AnimalFlags.HasClaws) && console.log('animals has claws');
    (animalFlags & AnimalFlags.CanFly) && console.log('animal can fly');
    (animalFlags == AnimalFlags.None) && console.log('nothing');
}
var animal = { flags: AnimalFlags.None };
printAnimalAbilities(animal);
animal.flags |= AnimalFlags.HasClaws;
printAnimalAbilities(animal);
animal.flags &= ~AnimalFlags.HasClaws;
printAnimalAbilities(animal);
animal.flags |= AnimalFlags.HasClaws | AnimalFlags.CanFly;
printAnimalAbilities(animal);
