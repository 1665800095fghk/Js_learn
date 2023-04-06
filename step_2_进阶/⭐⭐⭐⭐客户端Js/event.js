// window.addEventListener('load', event => {
//   // 事件类型
//   console.log(event.type);
//   // 触发事件的目标元素
//   console.log(event.target);
//   // 处理事件的元素，是this，除非是箭头函数，或者丢失了this
//   console.log(event.currentTarget);
// });

// 事件委托
// 如果我们可以以类似的方法处理元素
// 那就不必为每个元素分配处理程序
// 而是将单个处理程序放在它们共同的祖先上
// ! event.target.closest(selector) 返回与selector匹配的最近祖先

// 委托：标记
class Menu {
  constructor(elem) {
    this._elem = elem;
    elem.onclick = this.onClick.bind(this);
  }
  save() {
    alert("saving");
  }
  load() {
    alert("loading");
  }
  search() {
    alert("searching");
  }
  onClick(event) {
    let action = event.target.dataset.action;
    if (action) this[action]();
  }
}
new Menu(document.querySelector(".menu"));

// 行为模式
// 例子：计数器
document.addEventListener("click", (event) => {
  if (event.target.dataset.counter != undefined) {
    event.target.value++;
  }
});
// 例子：切换器
document.addEventListener("click", (event) => {
  let id = event.target.dataset.toggleId;
  if (!id) return;
  let elem = document.getElementById(id);
  elem.hidden = !elem.hidden;
});

// 题目：创建一个点击可以显示/隐藏子节点的树形菜单
for (let li of tree.querySelectorAll("li")) {
  let span = document.createElement("span");
  li.prepend(span);
  span.append(span.nextSibling);
}
tree.onclick = (event) => {
  if (event.target.tagName != "SPAN") return;
  let childrenContainer = event.target.parentNode.querySelector("ul");
  if (!childrenContainer) return;
  childrenContainer.hidden = !childrenContainer.hidden;
};

// 文档范围上下文菜单，与局部上下文菜单
elem.oncontextmenu = (event) => {
  // event.preventDefault();
  // event.stopPropagation();
  // alert("Button context menu");

  event.preventDefault();
  alert("Button context menu");
};
document.oncontextmenu = (event) => {
  // event.preventDefault();
  // alert("Document context menu");

  if (event.defaultPrevented) return;
  event.preventDefault();
  alert("Document context menu");
};

// 对于 onclick="handler()"
// 实际上是下面的代码
// function(event) {
//   handler();
// }

// 事件构造器
// let event = new Event(type[, options])
// - type 事件类型
// - options 具有两个可选属性的对象
//   - bubbles 为true时事件会冒泡
//   - cancelable 为true时默认行为会被阻止
// options 默认都为false

// dispatchEvent
let event_1 = new Event("click");
// elem_1.dispatchEvent(event_1);

// event.isTrusted 脚本生成事件为false，用户操作的事件为true

// 冒泡
document.addEventListener("hello", (event) => {
  alert("Hello from " + event.target.tagName);
});
let event_2 = new Event("hello", { bubbles: true });
// elem_2.dispatchEvent(event_2);

// 自定义
let event_3 = new CustomEvent("my_event", {
  // 自定义事件附加属性
  detail: { name: "Fghk" },
});
// elem_3.dispatchEvent(event_3);
// elem_3.addEventListener("my_event", event => {
//   // 附加属性
//   console.log(event.detail.name);
// });

// 创建一个可以选择元素的列表，例如在文件管理器中
document.querySelector("#highlight-list").addEventListener("click", (e) => {
  if (e.target.tagName != "LI") return;
  e.ctrlKey ? toggleSelect(e.target) : singleSelect(e.target);
});
document.querySelector("#highlight-list").onmousedown = () => false;
function toggleSelect(li) {
  li.classList.toggle("selected");
}
function singleSelect(li) {
  let selected = document.querySelectorAll(".selected");
  Array.from(selected).map((item) => item.classList.remove("selected"));
  li.classList.toggle("selected");
}

//
let one = document.forms.one;
let input_one = one.elements.one;
console.log(one, input_one, input_one.form);

// 网页的生命周期包括三个重要事件
// 1. DOMContentLoaded 完全加载HTML,并构建DOM树,但外部资源未加载完成
// - DOM已经就绪，可以查询DOM节点,并初始化接口
// 2. load 加载完成了HTML,并加载完成了外部资源
// - 外部资源加载完成,样式被应用
// 3. beforeunload / unload 用户离开页面时
// - beforeunload 正在离开,可以检查用户是否保存修改，并询问是否离开
// - unload 几乎已经离开了,但我们人可以进行某些操作,例如发送统计数据
