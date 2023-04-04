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
document.addEventListener('click', event => {
  if(event.target.dataset.counter != undefined) {
    event.target.value++;
  }
});
// 例子：切换器
document.addEventListener('click', event => {
  let id = event.target.dataset.toggleId;
  if(!id) return;
  let elem = document.getElementById(id);
  elem.hidden = !elem.hidden;
});


// 作业：创建一个点击可以显示/隐藏子节点的树形菜单
for(let li of tree.querySelectorAll('li')) {
  let span = document.createElement('span');
  li.prepend(span);
  span.append(span.nextSibling);
}
tree.onclick = event => {
  if(event.target.tagName != 'SPAN') return;
  let childrenContainer = event.target.parentNode.querySelector('ul');
  if(!childrenContainer) return;
  childrenContainer.hidden = !childrenContainer.hidden;
}