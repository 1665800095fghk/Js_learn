let rootjQuery;
let rquickExpr = /^(?:\s*(<[\w\W]+>)[^>]*|#([\w-]+))$/;
function init(selector, context) {
  let elem;
  // 当选择这些时退出 "" null undefined false
  if (!selector) return this;
  // 当 nodeType 存在，代表这是一个 HTML 元素
  if (selector.nodeType) {
    this[0] = selector;
    this.length = 1;
    return this;
    // 传入选择器为函数时
  } else if (typeof selector === 'function') {
    // rootjQuery 是一个代表 document 的对象
    return rootjQuery.ready !== undefined
      ? rootjQuery.ready(selector)
      // TODO selector(jQuery)
      : selector(jQuery);
    // 上面的都不满足，代表是一个 css 选择器
  } else {
    // 另起
    cssSelector(selector, context);
  }
}

function cssSelector(selector, context) {
  let match = selector + '';
  // 
  if (isObviousHtml(match)) {
    match = [null, selector, null];
  } else if (typeof selector === 'string') {
    match = rquickExpr.exec(match);
  } else {

    // HTML tag string
    match = selector + '';
    if(isObviousHtml(match)) {
      match = [null, selector, null];
    } else if (typeof selector === 'string') {
      // TODO RegExp
      match = rquickExpr.exec(match);
    } else {
      // TODO makeArray
      return jQuery.makeArray(selector, this);
    }
    
    if(match && (match[1] || !context)) {

      if(match[1]) {
        context = context instanceof jQuery ? context[0] : context;

        
      }
    }
  }
}

// 判断一个字符是否为 HTML 标签
function isObviousHtml(input) {
  return input[0] === '<'
    && input[input.length - 1] === '>'
    && input.length >= 3;
}