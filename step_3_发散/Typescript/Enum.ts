enum AnimalFlags {
  None = 0, // 0
  HasClaws = 1 << 0, // 0001 二进制
  CanFly = 1 << 1 // 0010 二进制
}
interface Animal {
  flags: AnimalFlags;
  [key: string]: any;
}
function printAnimalAbilities(animal: Animal) {
  let animalFlags = animal.flags;
  (animalFlags & AnimalFlags.HasClaws) && console.log('animals has claws');
  (animalFlags & AnimalFlags.CanFly) && console.log('animal can fly');
  (animalFlags == AnimalFlags.None) && console.log('nothing');
}

var animal = { flags: AnimalFlags.None };
printAnimalAbilities(animal); // nothing
// 使用 |= 添加一个标志
animal.flags |= AnimalFlags.HasClaws;
printAnimalAbilities(animal); // animal has claws
// 使用 &= 和 ~ 来清除一个标志
animal.flags &= ~AnimalFlags.HasClaws;
printAnimalAbilities(animal); // nothing
// 使用 | 来合并标志
animal.flags |= AnimalFlags.HasClaws | AnimalFlags.CanFly;
printAnimalAbilities(animal); // animal has claws, animal can fly