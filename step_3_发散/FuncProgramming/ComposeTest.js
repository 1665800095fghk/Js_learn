import { map, concatAll, filter, forEach, reduce, zip } from "./Array.js";
import { curry, partial } from "./CurryPartial.js";
import { compose, pipe } from "./Compose.js";
// compose 的使用案例
let n = compose(Math.round, parseFloat);
// console.log(n("3.56"));

// 统计字符串中单词的数量
let splitIntoSpaces = (str) => str.split(" ");
let count = (arr) => arr.length;
const countWords = compose(count, splitIntoSpaces);
// console.log(countWords("Hello World My Name is Fghk"));

// 引入柯里化和偏函数
let apressBooks = [
  {
    id: 111,
    title: "C# 6.0",
    author: "ANDREW TROELSEN",
    rating: [4.7],
    reviews: [{ good: 4, excellent: 12 }],
  },
  {
    id: 222,
    title: "Efficient Learning Machines",
    author: "Rahul Khanna",
    rating: [4.5],
    reviews: [],
  },
  {
    id: 333,
    title: "Pro AngularJS",
    author: "Adam Freeman",
    rating: [4.0],
    reviews: [],
  },
  {
    id: 444,
    title: "Pro ASP.NET",
    author: "Adam Freeman",
    rating: [4.2],
    reviews: [{ good: 14, excellent: 12 }],
  },
];
let filterOutStandingBooks = (book) => book.rating[0] === 5;
let filterGoodBooks = (book) => book.rating[0] > 4.5;
let filterBadBooks = (book) => book.rating[0] < 3.5;
let projectTitleAndAuthor = (book) => {
  return {
    title: book.title,
    author: book.author,
  };
};
let projectAuthor = (book) => {
  return {
    author: book.author,
  };
};
let projectTitle = (book) => {
  return {
    title: book.title,
  };
};
// 获取评分高于 4.5 的图书的标题和作者
let queryGoodBooks = partial(filter, undefined, filterGoodBooks);
let mapTitleAndAuthor = partial(map, undefined, projectTitleAndAuthor);
let titleAndAuthorForGoodBooks = compose(mapTitleAndAuthor, queryGoodBooks);
// console.log(
//   titleAndAuthorForGoodBooks(apressBooks)
// );