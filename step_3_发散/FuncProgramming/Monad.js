import request from "sync-request";
import { MayBe } from "./Functor.js";
import arrayUtil from "./Array.js";

// 使用 reddit api 搜索帖子，并获取搜索结果的评论列表
// 搜索帖子
const searchReddit = (search) => {
  let response;
  try {
    response = JSON.parse(
      request(
        "GET",
        `https://www.reddit.com/search.json?q=${encodeURI(search)}`
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
// console.log(searchReddit("javascript"));

// 根据 url 获取评论
const getComments = (link) => {
  let response;
  try {
    response = JSON.parse(
      request("GET", `https://www.reddit.com/${link}`).getBody("utf8")
    );
  } catch (err) {
    response = {
      message: "Something went wrong",
      errorCode: err["statusCode"],
    };
  }
  return response;
};

// 合并 searchReddit 和 getComments
const mergeViaMayBe = (searchText) => {
  let redditMayBe = MayBe.of(searchReddit(searchText));
  let ans = redditMayBe
    .map((arr) => arr["data"])
    .map((arr) => arr["children"])
    .map((arr) =>
      arrayUtil.map(arr, (x) => {
        return {
          title: x["data"].title,
          permalink: x["data"].permalink,
        };
      })
    )
    .map((obj) =>
      arrayUtil.map(obj, (x) => {
        return {
          title: x.title,
          comments: MayBe.of(
            getComments(x.permalink.replace("?ref=search_posts", ".json"))
          ),
        };
      })
    );
  return ans;
};
// console.log(
//   mergeViaMayBe("javascript")
// );

let joinExample = MayBe.of(MayBe.of(5));
// 如果没有 join，我们想让内部的 5 加个 4，需要这么写
// console.log(
//   joinExample.map((outsideMayBe) => {
//     return outsideMayBe.map((item) => item + 4);
//   })
// );
// 但是如果使用 join，可以这么写
// console.log(joinExample.join().map((item) => item + 4));

// 现在，我们使用 join 展开返回的评论
const mergeViaMayBeJoin = (searchText) => {
  let redditMayBe = MayBe.of(searchReddit(searchText));
  let ans = redditMayBe
    .map((arr) => arr["data"])
    .map((arr) => arr["children"])
    .map((arr) =>
      arrayUtil.map(arr, (x) => {
        return {
          title: x["data"].title,
          permalink: x["data"].permalink,
        };
      })
    )
    .chain((obj) =>
      arrayUtil.map(obj, (x) => {
        return {
          title: x.title,
          comments: MayBe.of(
            getComments(x.permalink.replace("?ref=search_posts", ".json"))
          ).join(),
        };
      })
    );
  return ans;
};
// console.log(
//   mergeViaMayBeJoin("javascript")
// );

// Monad 是什么?
// Monad 就是一个实现了 chain 的函子
