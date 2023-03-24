export function inherit(p) {
  if (p == null) throw TypeError();
  if (Object.create) return Object.create(p);
  let t = typeof p;
  if (t !== "object" && t !== "function") throw TypeError();

  function F() {
  }

  F.prototype = p;
  return new F();
}


/**
 * 把 p 中可枚举属性复制到 o 中，并返回 o，
 * 如果 o 和 p 中有同名属性，则覆盖 o 中的属性，
 * 该函数不处理 getter 和 setter 以及复制属性
 * @param {Object} o
 * @param {Object} p
 * @return {Object}
 */
export function extend(o, p) {
  for (i in p) {
    o[i] = p[i];
  }
  return o;
}

/**
 * 将 p 中的可枚举属性复制到 o 中，并返回 o，
 * 如果 o 和 p 中有同名属性， o 中属性不受影响，
 * 这个函数并不处理 getter 和 setter 以及复制属性
 * @param {Object} o
 * @param {Object} p
 * @return {Object}
 */
export function merge(o, p) {
  for (i in p) {
    if (o.hasOwnProperty(i)) continue;
    o[i] = p[i];
  }
  return o;
}

/**
 * 如果 o 中的属性在 p 中没有同名属性，则从 o 中删除这个属性，返回 o
 * @param {Object} o
 * @param {Object} p
 * @return {Object}
 */
export function restrict(o, p) {
  for (i in o) {
    if (!(i in p)) delete o[i];
  }
  return o;
}

/**
 * 如果 o 中的属性在 p 中存在同名属性，则从 o 中删除这个属性，返回 o
 * @param {Object} o
 * @param {Object} p
 * @return {Object}
 */
export function subtract(o, p) {
  for (i in p) {
    delete o[i];
  }
  return o;
}

/**
 * 返回一个新的对象，这个对象同时拥有 o 和 p 的属性，
 * 如果存在同名属性，使用 p 的属性值
 * @param {Object} o
 * @param {Object} p
 * @return {Object}
 */
export function union(o, p) {
  return extend(extend({}, o), p);
}

/**
 * 返回一个新的对象，这个对象拥有同时在 o 和 p 中出现的属性，
 * 很像求交集，但 p 中的属性值被忽略
 * @param {Object} o
 * @param {Object} p
 * @return {Object}
 */
export function intersection(o, p) {

}

/**
 * 返回一个数组，这个数组包含的是 o 中可枚举的自有属性的名字
 * @param {Object} o
 * @return {Array}
 */
export function keys(o) {

}