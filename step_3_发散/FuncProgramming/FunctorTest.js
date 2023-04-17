import arrayUtil from "./Array.js";
import { MayBe, Either } from "./Functor.js";
import request from "sync-request";
const { Some, Nothing } = Either;

// 这里我们可以发现，我们在 map 函子的时候不用管 x 是否为 null 或 undefined
// 因为我们已经用 MayBe 函子将其抽象出来了
// console.log(
//   MayBe.of("hello").map(x => x.toUpperCase())
// );

// MayBe 函子由两个重要的属性
// 1. 在链式调用中，即使有一个函数返回了 null 或 undefined，MayBe 也可以处理
// 2. 所有的 map 都会被调用，即使接收到的是 null 或 undefined
MayBe.of("ssss")
  .map(() => undefined)
  .map((x) => "Ms. " + x);

// 获取 reddit 子版块 top10 的数据
let getTopTenRedditPosts = (type) => {
  let response;
  try {
    response = JSON.parse(
      request(
        "GET",
        `https://www.reddit.com/r/subreddits/${type}.json?limit=10`
      ).getBody("utf8")
    );
  } catch (err) {
    response = {
      message: "Something went wrong",
      errorCode: err["statusCode"],
    };
  }
  return response;
};
// 使用 MayBe 函子获取 reddit 子版块的 Top10 帖子
let getTopTenSubRedditData = (type) => {
  let response = getTopTenRedditPosts(type);
  return MayBe.of(response)
    .map((arr) => arr["data"])
    .map((arr) => arr["children"])
    .map((arr) =>
      arrayUtil.map(arr, (x) => {
        return {
          title: x["data"].title,
          url: x["data"].url,
        };
      })
    );
};
// 无法输出 err 信息，只会输出 null
// console.log(
//   getTopTenSubRedditData('new2')
// );

// 使用 Either 解决无法输出 err 的问题
// 使用 Either 函子获取 reddit 子版块的 Top10 帖子
let getTopTenSubRedditPostsEither = (type) => {
  let response;
  try {
    response = Some.of(
      JSON.parse(
        request(
          "GET",
          `https://www.reddit.com/r/subreddits/${type}.json?limit=10`
        ).getBody("utf8")
      )
    );
  } catch (err) {
    response = Nothing.of({
      message: "Something went wrong",
      errorCode: err["statusCode"],
    });
  }
  return response;
};
let getTopTenSubRedditDataEither = (type) => {
  let response = getTopTenSubRedditPostsEither(type);
  return response
    .map((arr) => arr["data"])
    .map((arr) => arr["children"])
    .map((arr) =>
      arrayUtil.map(arr, (x) => {
        return {
          title: x["data"].title,
          url: x["data"].url,
        };
      })
    );
};
// console.log(getTopTenSubRedditDataEither("new2"));
// console.log(
//   getTopTenSubRedditDataEither("hot")
// );