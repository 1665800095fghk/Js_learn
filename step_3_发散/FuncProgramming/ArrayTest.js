import { map, concatAll, filter, forEach, reduce, zip } from "./Array.js";

let apressBooksA = [
  {
    name: "beginners",
    bookDetails: [
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
    ],
  },
  {
    name: "pro",
    bookDetails: [
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
    ],
  },
];

let apressBooksB = [
  {
    name: "beginners",
    bookDetails: [
      {
        id: 111,
        title: "C# 6.0",
        author: "ANDREW TROELSEN",
        rating: [4.7],
      },
      {
        id: 222,
        title: "Efficient Learning Machines",
        author: "Rahul Khanna",
        rating: [4.5],
        reviews: [],
      },
    ],
  },
  {
    name: "pro",
    bookDetails: [
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
      },
    ],
  },
];

let reviewDetails = [
  {
    id: 111,
    reviews: [{ good: 4, excellent: 12 }],
  },
  {
    id: 222,
    reviews: [],
  },
  {
    id: 333,
    reviews: [],
  },
  {
    id: 444,
    reviews: [{ good: 14, excellent: 12 }],
  },
];

// 统计 good 评价和 excellent 评价的数量
// console.log(
//   reduce(concatAll(map(apressBooksA, book => book.bookDetails)), (acc, bookDetail) => {
//     bookDetail.reviews[0]?.good ? acc.good += bookDetail.reviews[0].good : null;
//     bookDetail.reviews[0]?.excellent ? acc.exce += bookDetail.reviews[0].excellent : null;
//     return acc;
//   }, { good: 0, exce: 0 })
// );

// zip 实例，将两个数组相加
// console.log(zip([1, 2, 3], [4, 5, 6], (a, b) => a + b));

// zip 实例，合并对象
// console.log(
//   zip(
//     concatAll(map(apressBooksB, (book) => book.bookDetails)),
//     reviewDetails,
//     (book, reviews) => {
//       if (book.id === reviews.id) {
//         let clone = Object.assign({}, book);
//         clone.ratings = reviews;
//         return clone;
//       }
//     }
//   )
// );