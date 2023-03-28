// 回顾一下可迭代对象
let range = {
  from: 1,
  to: 5,

  [Symbol.iterator]() {
    return {
      current: this.from,
      last: this.to,

      next() {
        return this.current <= this.last
          ? { done: false, value: this.current++ }
          : { done: true };
      },
    };
  },
};

// 异步可迭代对象
// 1. 使用 Symbol.asyncInerator 代替 Symbol.iterator
// 2. next() 应该返回一个 promise
// 3. 应该使用 for await (let item of iterator) 循环来迭代对象
let range_async = {
  from: 1,
  to: 5,

  [Symbol.asyncIterator]() {
    return {
      current: this.from,
      last: this.to,

      async next() {
        await new Promise((resolve) => setTimeout(resolve, 1000));

        return this.current <= this.last
          ? { done: false, value: this.current++ }
          : { done: true };
      },
    };
  },
};
// 匿名函数迭代异步迭代器
// (async () => {
//   for await (let value of range_async) {
//     console.log(value);
//   }
// })();

// 异步 generator
async function* generatorSequence(start, end) {
  for (let i = start; i <= end; i++) {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    yield i;
  }
}
// (async () => {
//   let generator = generatorSequence(1, 5);
//   for await (let value of generator) {
//     console.log(value);
//   }
// })();

// 异步可迭代 range
let range_async_ = {
  from: 1,
  to: 5,
  async *[Symbol.asyncIterator]() {
    for (let value = this.from; value <= this.to; value++) {
      await new Promise((resolve) => setTimeout(resolve, 1000));
      yield value;
    }
  },
};
(async () => {
  for await (let value of range_async_) {
    console.log(value);
  }
})();


// 实践：分页的数据
// 目前，有很多在线服务都是发送的分页的数据（paginated data）
// 例如，当我们需要一个用户列表时
// 一个请求只返回一个预设数量的用户（例如 100 个用户）—— “一页”
// 并提供了指向下一页的 URL
// 我们应该以 https://api.github.com/repos/<repo>/commits 格式创建进行 fetch 的网络请求。
// 它返回一个包含 30 条 commit 的 JSON，并在返回的 Link header 中提供了指向下一页的链接。
// 然后我们可以将该链接用于下一个请求，以获取更多 commit，以此类推。
async function* fetchCommits(repo) {
  let url = `https://api.github.com/repos/${repo}/commits`;

  while (url) {
    const response = await fetch(url, {
      headers: {'User-Agent': 'Our script'}
    });

    const body = await response.json();

    let nextPage = response.headers.get('Link').match(/<(.*?)>; rel="next"/);
    nextPage = nextPage?.[1];

    url = nextPage;

    for (let commit of body) {
      yield commit;
    }
  }
}
// (async () => {
//   let count = 0;
//   for await (const commit of fetchCommits('1665800095fghk/Js_learn')) {
//     console.log(commit.author.login);
//     if(++count == 100) {
//       break;
//     }
//   }
// })();