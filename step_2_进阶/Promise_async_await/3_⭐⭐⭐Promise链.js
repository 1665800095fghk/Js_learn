// Promise 链
// Promise 中，每个 then 会返回一个新的 Promise，所以可以链式调用
// new Promise(function (resolve, reject) {
//   setTimeout(() => resolve(1), 1000);
// }).then(res => {
//   // console.log(res);
//   return res * 2;
// }).then(res => {
//   // console.log(res);
//   return res * 2;
// }).then(res => {
//   // console.log(res);
//   return res * 2;
// });

// 返回 Promise
// .then(handler) 的 handler 可以返回一个 promise，其他的处理程序会等它 settled 后在获取其结果
// new Promise(function (resolve, reject) {
//   setTimeout(() => resolve(1), 1000);
// }).then(res => {
//   console.log(res);
//   return new Promise(function (resolve, reject) {
//     setTimeout(() => resolve(res * 2), 1000);
//   });
// }).then(res => {
//   console.log(res);
//   return new Promise(function (resolve, reject) {
//     setTimeout(() => resolve(res * 2), 1000);
//   });
// }).then(res => {
//   console.log(res);
// });

// 例子
// loadScript("/fghk/test_1.js")
//   .then(script => loadScript("/fghk/test_2.js"))
//   .then(script => loadScript("/fghk/test_3.js"))
//   .then(script => {
//     // 使用在脚本中声明的函数
//   });

// 处理程序返回的其实不是 promise，而是 thenable 对象，一个具有 .then 的任意对象，会被当做 promise 对待
class Thenable {
  constructor(num) {
    this.num = num;
  }
  then(resolve, reject) {
    console.log(resolve);
    setTimeout(() => resolve(this.num * 2), 1000);
  }
}
// new Promise(resolve => resolve(1))
//   .then(res => new Thenable(res))
//   .then(console.log);

// 更复杂 -- fetch
// fetch 被用于网络请求
// fetch("https://restapi.amap.com/v3/weather/weatherInfo?key=69f8639699b4b8fc8b095d7fb2d7249e&city=420100&extensions=base")
//   .then(res => {
//     // 将返回的数据解析为 json
//     return res.json();
//     // 解析为文本 res.text();
//   })
//   .then(res => console.log(res));

// 请求 github，获取头像
function loadJson(url) {
  return fet;
}
fetch("https://api.github.com/users/1665800095fghk")
  .then((res) => res.json())
  .then(
    (user) =>
      new Promise((resolve, reject) => {
        let img = document.createElement("img");
        img.src = user.avatar_url;
        img.className = "promise-avatar-img";
        document.body.appendChild(img);

        setTimeout(() => {
          img.remove();
          resolve(user);
        }, 3000);
      })
  )
  .then((user) => console.log(`Finished showing ${user.name}`));


// 将其拆分为函数
function loadJson(url) {
  return fetch(url).then((response) => response.json());
}

function loadGithubUser(name) {
  return loadJson(`https://api.github.com/users/${name}`);
}

function showAvatar(githubUser) {
  return new Promise(function (resolve, reject) {
    let img = document.createElement("img");
    img.src = githubUser.avatar_url;
    img.className = "promise-avatar-example";
    document.body.append(img);

    setTimeout(() => {
      img.remove();
      resolve(githubUser);
    }, 3000);
  });
}
// 使用
loadJson("/test/user_1.json")
  .then((user) => loadGithubUser(user.name))
  .then(showAvatar)
  .then((githubUser) => alert(`Finished showing ${githubUser.name}`));