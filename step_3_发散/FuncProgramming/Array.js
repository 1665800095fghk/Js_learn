// 传入一个数组和一个函数，对数组中的每个元素执行函数
const forEach = (arr, fun) => {
  for (const value of arr) {
    fun(value);
  }
}

// 传入一个数组和一个函数，对数组中的每个元素执行函数，返回一个新的数组
const map = (arr, fun) => {
  let results = [];
  for (const value of arr) {
    results.push(fun(value));
  }
  return results;
}

// 传入一个数组和一个函数，对数组进行过滤，返回一个新的数组
const filter = (arr, fun) => {
  let results = [];
  for (const value of arr) {
    fun(value) ? results.push(value) : undefined;
  }
  return results;
}

// 将嵌套数组（数组中包含一组数组）的元素合并为单个数组
const concatAll = (arr) => {
  let results = [];
  for (const value of arr) {
    // 这里很巧妙，使用 apply 将一个数组内嵌入的数组作为参数数组传入 push，从而展开嵌套数组
    results.push.apply(results, value);
  }
  return results;
}

// 利用传入的函数将元素都被归约到一个值
const reduce = (arr, fun, initalValue) => {
  let acumlator = 0;
  initalValue != undefined
    ? acumlator = initalValue
    : acumlator = arr[0];
  if (initalValue === undefined) {
    for (let i = 1; i < arr.length; i++) {
      acumlator = fun(acumlator, arr[i]);
    }
  } else {
    for (const value of arr) {
      acumlator = fun(acumlator, value);
    }
  }
  return [acumlator];
}

const zip = (leftArr, rightArr, fun) => {
  let index, result = [];
  for(index = 0; index< Math.min(leftArr.length, rightArr.length); index++) {
    result.push(fun(leftArr[index], rightArr[index]));
  }
  return result;
}

export default {map, reduce, filter, forEach, concatAll, zip}