// async-await
// 这是以更舒适的方式使用 promise 的一种特殊方法

// async function
// 这个函数返回一个 promise
// 其他的值被自动包裹在一个 resolved 的 promise 中
async function f() {
  return 1;
}
// f().then(console.log);

// await
// await 能写在 async 函数中和模块顶层
// await 让 Js 引擎等待，直到 promise 完成并返回结果
// let value = await promise;

// 例子
// 相比于 then 它是获取 promise 结果一种更优雅的方法
async function f_1() {
  let promise = new Promise((resolve, reject) => {
    setTimeout(() => resolve("done!"), 1000);
  });

  let result = await promise;

  console.log(result);
}
// f_1();

// 拿 Promise 链中的 showAvatar 做例子
async function showAvatar() {
  // 加载 json
  let response = await fetch("/test/fghk.json");
  let user = await response.json();

  // 请求用户数据
  let githubResponse = await fetch(`https://api.github.com/users/${user.name}`);
  let githubUser = await githubResponse.json();

  // 创建 Dom 节点
  let img = document.createElement("img");
  img.src = githubUser.avatar_url;
  img.className = "promise-avatar-example";
  document.body.appendChild(img);

  // 延时删除
  await new Promise((resolve, reject) => setTimeout(resolve, 1000));
  img.remove();

  return githubUser;
}

// 异常捕获
// 可以在函数代码中使用 try...catch 或在函数调用时使用 catch

// 重写
function loadJson(url) {
  return fetch(url).then((response) => {
    if (response.status == 200) {
      return response.json();
    } else {
      throw new Error(response.status);
    }
  });
}
async function loadJson_(url) {
  let response = await fetch(url);
  if (response.status == 200) {
    let json = await response.json();
    return json;
  }
  throw new Error(response.status);
}

