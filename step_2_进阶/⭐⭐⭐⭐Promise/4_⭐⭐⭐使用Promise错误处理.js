// 下面代码中抛出任意异常都会触发最后的 catch
// fetch('/test/user.json')
//   .then(response => response.json())
//   .then(user => fetch(`https://api.github.com/users/${user.name}`))
//   .then(response => response.json())
//   .then(githubUser => new Promise((resolve, reject) => {
//     let img = document.createElement('img');
//     img.src = githubUser.avatar_url;
//     img.className = "promise-avatar-example";
//     document.body.append(img);

//     setTimeout(() => {
//       img.remove();
//       resolve(githubUser);
//     }, 3000);
//   }))
//   .catch(error => alert(error.message));


// 隐事 try catch
// 下面两段代码相同
// 因为 executor 周围的隐式 try...catch 自动补货了 error，并将其变为 rejected promise
// new Promise((resolve, reject) => {
//   throw new Error("Error");
// }).catch(console.log);
// new Promise((resolve, reject) => {
//   reject(new Error("Error"));
// }).catch(console.log);


// 再次抛出
// new Promise((resolve, reject) => {
//   throw new URIError("Error");
// }).catch(err => {
//   if(err instanceof URIError) {

//   } else {
//     console.log("Can't handle such error");
//     throw error;
//   }
// }).then(res => {
//   // 当上面的为 URIError 或没有异常执行
//   console.log("Yes");
// }).catch(err => {
//   console.log(err);
// });


// 下面的 catch 不会被触发，因为错误不在 executor 运行时产生
// 而是在稍后生成的，所以 promise 无法处理它
new Promise((resolve, reject) => {
  setTimeout(() => {
    throw new Error("error");
  });
}).catch(console.log);