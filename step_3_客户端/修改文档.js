// 清除元素
// 创建一个函数 clear(elem) 用来移除元素里的内容。
function clear(elem) {
  // 你的代码
  while (elem.firstChild) {
    elem.firstChild.remove();
  }
  // 易犯错误
  // 因为元素在被删除，i 在一直增加，所以有的元素会被跳过
  // for (let i = 0; i < elem.childNodes.length; i++) {
  //   elem.childNodes[i].remove();
  // }
}

// 从对象创建树
// 编写一个函数 createTree，从嵌套对象创建一个嵌套的 ul/li 列表（list）
function createTree(container, data) {
  container.appendChild(createLi(data));
}
function createLi(data) {
  if (!Object.keys(data).length) return;
  let ul = document.createElement("ul");
  for (let key in data) {
    let li = document.createElement("li");
    li.innerText = key;
    let child = createLi(data[key]);
    if (child) li.appendChild(child);
    ul.appendChild(li);
    console.log(li);
  }
  return ul;
}

// 在树中显示后代
// 这里有一棵由嵌套的 ul/li 组成的树。
// 编写代码，为每个 <li> 添加其后代数量。跳过叶子节点（没有子代的节点）。
function createLiCount(ul) {
  let lis = ul.getElementsByTagName("li");
  for (let li of lis) {
    let count = li.getElementsByTagName("li").length;
    if (!count) continue;
    // data 文本节点的内容
    li.firstChild.data += "[" + count + "]";
  }
}