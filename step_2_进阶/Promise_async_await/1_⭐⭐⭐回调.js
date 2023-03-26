// 当我们需要加载脚本
function loadScript(src, callback) {
  let script = document.createElement("script");
  script.src = src;

  script.onload = () => callback(script);
  script.onerror = () => callback(new Error(`Script load error for ${src}`));

  document.head.appendChild(script);
}
// 使用
loadScript("/fghk/test_1.js", function (error, script) {
  if (error) {
    // 处理 err
  } else {
    console.log("脚本加载完成后输出");

    // 当加载多个脚本
    loadScript("/fghk/test_2.js", function (error, script) {
      if (error) {
      } else {
        
        // ...
      }
    });    
  }
});
// 这种方法是不好的，解决方法是使用 Promise