// 静态方法，属于类，不属于任何对象
class User_1 {
  static staticMethod() {
    console.log(this === User_1);
  }
}
// 上面代码相当于
class User_2 { }
User_2.staticMethod = function () {
  console.log(this === User_2);
}
// User_1.staticMethod();
// User_2.staticMethod();

// 使用实例
class Article_1 {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }
  static compare(a, b) {
    return a.date - b.date;
  }
}
let articles = [
  new Article_1("HTML", new Date(2019, 1, 1)),
  new Article_1("CSS", new Date(2019, 0, 1)),
  new Article_1("JavaScript", new Date(2019, 11, 1))
];
// console.log(articles);
// articles.sort(Article_1.compare);
// console.log(articles);

class Article_2 {
  constructor(title, date) {
    this.title = title;
    this.date = date;
  }
  static createTodays() {
    // this = Article_2
    return new this("Today's dgiest", new Date());
  }
}
// let article = Article_2.createTodays();
// console.log(article.title);

// 静态属性
class Article_3 {
  static publisher = "Fghk";
}
// console.log(Article_3.publisher);

// 静态属性与静态方法是可继承的
// 继承是在构造函数的 prototype 之间设置原型，用来获取实例方法
// 并且会在构造函数直接设置原型，用来获取静态方法
class Animal_1 {
  static planet = "Earch";

  constructor(name, speed) {
    this.speed = speed;
    this.name = name;
  }
  run(speed) {
    this.speed = speed;
    console.log(`${this.name} runs with speed ${this.speed}`);
  }
  stop() {
    this.speed = 0;
    console.log(`${this.name} stands still`);
  }
  static compare(a, b) {
    return a.speed - b.speed;
  }
}
class Rabbit_1 extends Animal_1 {
  hide() {
    console.log(`${this.name} hides!`);
  }
}
let rabbits = [
  new Rabbit_1("White Rabbit", 10),
  new Rabbit_1("Black Rabbit", 5)
];
// console.log(rabbits);
// rabbits.sort(Rabbit_1.compare);
// console.log(rabbits);