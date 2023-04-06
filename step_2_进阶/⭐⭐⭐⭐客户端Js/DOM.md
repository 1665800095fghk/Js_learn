## 客户端中的 Js

在客户端中有一个全局对象 window
它包含三个部分

- DOM  
  文档对象模型 (Document Object Model)，将所有页面内容表示为可修改的对象
- BOM  
  浏览器对象模型 (Browser Object Model)，表示浏览器提供的用于处理文档之外所有内容的其他对象
- JavaScript

## DOM 树

HTML 文档的主干是标签，每个 HTML 标签都是对象，嵌套标签是闭合标签的子标签，标签内的文本也是一个对象

## 遍历 DOM

document.documentElement = `<html>`  
document.body = `<body>`  
document.head = `<head>`

```js
// 遍历
for (let i = 0; i < document.body.childNodes.length; i++) {
  console.log(document.body.childNodes[i]);
}
```

如上面看到的一样，childNodes 像一个数组

```js
// 使用 for..of 迭代
for (let node of document.body.childNodes) {
  console.log(node);
}
```

但是，它无法使用数组的方法，因为它不是数组

```js
console.log(document.body.childNodes.filter); // undefined
```

> 不要使用 for..in 迭代 DOM，因为 for..in 遍历所有可枚举属性，DOM 有一些额外的很少被用到的属性

## 兄弟节点与父节点

```js
console.log(document.body.parentNode === document.documentElement); // true
console.log(document.head.nextSibling); // HTMLBodyElement
console.log(document.body.previousSibling); // HTMLHeadElement
```

## 纯元素节点

上面的导航的属性引用所有节点，例如文本节点，元素节点，甚至包括注释节点  
但是对于许多任务来说，我们只需要代表标签和形成页面结构的元素节点

- parentElement 父元素
- previousElementSibling 上一个兄弟元素
- nextElementSibling 下一个兄弟元素
- children 仅那些作为元素的子节点
- firstElementSibling 第一个子元素
- lastElementSibling 最后一个子元素

```js
for (let node of document.body.children) {
  console.log(node);
}
```

```js
// 对 DOM 的遍历
function mapNode(node, hierarchy) {
  let str = "";
  for (let i = 0; i < hierarchy; i++) str += "-->";
  console.log(str, node.nodeName);
  hierarchy++;
  if (node.hasChildNodes()) {
    for (let item of node.children) {
      mapNode(item, hierarchy);
    }
  }
}
```

## DOM 搜索

- getElement\*
  - getElementById 根据 id
  - getElementsByName 根据 name
  - getElementsByTagName 根据标签名
  - getElementsByClassName 根据 class
- querySelector\*
  - querySelectorAll 根据 css 选择器，选择所有
  - querySelector 根据 css 选择器，选择第一个
- matches 检查 elem 是否与给定选择器匹配
- closeat 寻找与 css 匹配的最近祖先

## 动态集合

- getElementBy\* 返回是实时的动态集合
- querySelectorAll 返回的是静态的集合

## DOM 节点类

- EvenTarget 一切的根
  - Node 一个抽象类，作为 DOM 节点的基础
    - Document 是一个整体的文档，document 属于这个类
      - HTMLDocument
    - Element 是 DOM 元素的基础类
      - HTMLElement 是 HTML 元素的基础类
        - HTMLInputElement `<input>`元素
        - HTMLBodyElements `<body>`元素
        - HTMLAnchorElement `<a>`元素
    - CharacterData 一个抽象类
      - Text 文本
      - Comment 注释

## nodeType

- 元素节点 elem.nodeType == 1
- 文本节点 elem.nodeType == 3
- document 对象 elem.nodeType == 9

## nodeName 和 tagName

- tagName 仅用于`Element`节点
- nodeName 为任意`Node`定义

## innerHTMl

将元素中的`HTMl`获取为字符串

```js
document.body.innerHTML = "<div>New</div>";
```

> 注意`innerHTML+=`，它会完全重写  
> 如下面代码展示的一样，会重新给`innerHTML`赋值  
> 如果原本的`innerHTML`中有许多图片，这会导致它们重新加载

```js
// 这两段代码相同
elem.innerHTML += "...";
elem.innerHTML = elem.innerHTML + "...";
```

## outerHTML

返回元素完整的`HTML`

```html
<div id="elem">Hello</div>

<script>
  // ...
  console.log(elem.outerHTML); // <div id=elem>Hello</div>
</script>
```

## nodeValue/data

文本节点内容，`innerHTML`仅对元素节点生效  
其余节点，例如文本，具有它们的对应项，`nodeValue`和`data`

```html
<body>
  Hello
  <!-- Comment -->
  <script>
    let text = document.body.firstChild;
    alert(text.data); // Hello
    let comment = text.nextSibling;
    alert(comment.data); // Comment
  </script>
</body>
```

## textContent - 纯文本

提供了对元素文本的访问权限，去掉`<tag>`

## hidden

用于控制元素显示

```html
<div>Both divs below are hidden</div>

<div hidden>With the attribute "hidden"</div>

<div id="elem">JavaScript assigned the property "hidden"</div>

<script>
  elem.hidden = true;
</script>
```

## 更多属性

- value - `<input>`...
- href - `<a>`
- id

## DOM 属性

DOM 拥有许多内建属性，DOM 是常规的 Js 对象，我们可以修改它

```js
// 新建属性
document.body.myData = {
  name: "Tmp",
  title: "Tmp",
};
// 添加方法
document.body.sayTagName = function () {
  console.log(this.tagName);
};
// 为所有元素添加一个方法
Element.prototype.sayHi = function () {
  console.log(`Hello I'm ${this.tagName}`);
};
```

## HTML 特性

一些标签可能具有特性，当浏览器解析 HTML 文本，根据标签创建 DOM 对象时，浏览器会辨别标准的特性并以此创建 DOM 属性  
有关特性的方法:

- elem.hasAttribute(name) - 检测特性是否存在
- elem.getAttribute(name) - 获取这个属性值
- elem.setAttribute(name, value) - 设置这个特性值
- elem.removeAttribute(name) - 移除这个特性
  特性的特点:
- 特性的名称大小写不敏感
- 可以赋任意值给特性，但是这些东西会自动变为字符串
- 所有特性在 `outerHTML` 中可见
- `attributes` 集合是可迭代对象，该对象把元素的特性作为 `name` 和 `value` 属性存储在对象中

## 属性-特性同步

当一个标准的特性被修改，对应属性也会自动更新

```html
<input />

<script>
  let input = querySelector("input");

  // 特性 => 属性
  input.setAttribute("id", "id");
  console.log(input.id);

  // 属性 => 特性
  input.id = "newId";
  console.log(input.getAttribute("id")); // newId
</script>
```

但是也有例外，比如 `input.value`只支持特性同步到属性

## 非标准特性

```html
<div show-info="name"></div>
<div show-info="age"></div>

<script>
  let user = {
    name: "Fghk",
    age: 25,
  };
  for (let div of document.querySelectorAll("[show-info]")) {
    let field = div.getAttribute("show-info");
    div.innerTEXT = user[fuekd];
  }
</script>
```

## data-

所有以 `data-` 开头的特性均被保留给程序员使用，它们可以在 `dataset` 属性中使用

```html
<body data-about="fghk">
  <script>
    alert(document.body.dataset.about); // fghk
  </script>
</body>
```

## 创建元素

```html
<style>
  .alert {
    padding: 15px;
    border: 1px solid #d6e9c6;
    border-radius: 4px;
    color: #3c763d;
    background-color: #dff0d8;
  }
</style>
<script>
  // let div = document.createElement('div'); 
  // let textNode = document.createTextNode("Here I am");

  // 创建消息
  document.createElement('div'); 
  div.className = "alert";
  div.innerHTML = "<strong>Hi there!</strong>You've read an important message."
  document.body.append(div);
</script>
```
有关插入的方法:  
- node.append - 末尾
- node.prepend - 开头
- node.before - 前面
- node.after - 后面
- node.replaceWith - 将 node 替换为给定节点或字符串

