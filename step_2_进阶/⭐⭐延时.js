// 编写一个函数 printNumbers(from, to)
// 使其每秒输出一个数字，数字从 from 开始，到 to 结束。
function printNumbers_1(from, to) {
  let timer = setInterval(() => {
    from <= to ? console.log(from++) : clearInterval(timer);
  }, 1000);
}
function printNumbers_2(from, to) {
  function go() {
    console.log(from);
    if (from < to)
      setTimeout(go, 1000);
    from++;
  }
  go();
}