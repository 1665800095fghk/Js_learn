## 介绍jQuery
jQuery 是一个 Js 的库，它简化了我们的 Js 编程，而且它很容易学习  
那么，它有什么功能呢  
- HTML 元素选取
- HTML 元素操作
- CSS 操作
- HTML 事件函数
- Js 特效和动画
- HTML DOM 遍历和修改
- AJAX
- Utilities

## 使用
语法: `$(selector).action()`
- 美元符号定义 jQuery
- selector 查找 HTML 元素
- action() 对于元素进行操作

```js
$(this).hide(); // 隐藏当前元素
$('p').hide(); // 隐藏所有 p 元素
$('p.test').hide(); // 隐藏 class 为 test 的 p元素
$('#test').hide(); // 隐藏 id 为 test 的元素
// 文档就绪事件
$(document).ready(function() {
    // something
});
$(function() {
    // something
});
```

事件
```js
$('p').click(function() {
    $(this).hide(); // 当一个 p 被点击，隐藏它自己
});
```

