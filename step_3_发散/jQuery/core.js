import DOMEval from "./core/DOMEval";
import isArrayLike from './core/isArrayLike';

let class2type = {};

let version = "1.0.0";
// 以 HTML 结束的字符串
let rhtmlSuffix = /HTML$/i;
let jQuery = function (selector, context) {
  return new jQuery.fn.init(selector, context);
}

jQuery.fn = jQuery.prototype = {
  jquery: version,
  constructor: jQuery,
  length: 0,
  toArray: function () {
    return [].slice.call(this);
  },
  get: function (num) {
    if (num == null) {
      return [].slice.call(this);
    }
    return num < 0 ? this[num + this.length] : this[num];
  },
  pushStack: function (elems) {
    let ret = jQuery.merge(this.constructor(), elems);
    ret.prevObject = this;
    return ret;
  },
  // 为匹配集合中每个元素执行回调
  each: function (callback) {
    return jQuery.each(this, callback);
  },
  map: function (callback) {
    return this.pushStack(jQuery.map(this, function (elem, i) {
      return callback.call(elem, i, elem);
    }));
  },
  slice: function () {
    return this.pushStack([].slice.apply(this, arguments));
  },
  first: function () {
    return this.eq(0);
  },
  last: function () {
    return this.eq(-1);
  },
  even: function () {
    return this.pushStack(jQuery.grep(this, function (_elem, i) {
      return (i + 1) % 2;
    }));
  },
  odd: function () {
    return this.pushStack(jQuery.grep(this, function (_elem, i) {
      return i % 2;
    }));
  },
  eq: function (i) {
    var len = this.length,
      j = +i + (i < 0 ? len : 0);
    return this.pushStack(j >= 0 && j < len ? [this[j]] : []);
  },
  end: function () {
    return this.prevObject || this.constructor();
  }
}


jQuery.extend = jQuery.fn.extend = function () {
  var options, name, src, copy, copyIsArray, clone,
    target = arguments[0] || {},
    i = 1,
    length = arguments.length,
    deep = false;
  // Handle a deep copy situation
  if (typeof target === "boolean") {
    deep = target;
    // Skip the boolean and the target
    target = arguments[i] || {};
    i++;
  }
  // Handle case when target is a string or something (possible in deep copy)
  if (typeof target !== "object" && typeof target !== "function") {
    target = {};
  }
  // Extend jQuery itself if only one argument is passed
  if (i === length) {
    target = this;
    i--;
  }
  for (; i < length; i++) {
    // Only deal with non-null/undefined values
    if ((options = arguments[i]) != null) {
      // Extend the base object
      for (name in options) {
        copy = options[name];
        // Prevent Object.prototype pollution
        // Prevent never-ending loop
        if (name === "__proto__" || target === copy) {
          continue;
        }
        // Recurse if we're merging plain objects or arrays
        if (deep && copy && (jQuery.isPlainObject(copy) ||
          (copyIsArray = Array.isArray(copy)))) {
          src = target[name];
          // Ensure proper type for the source value
          if (copyIsArray && !Array.isArray(src)) {
            clone = [];
          } else if (!copyIsArray && !jQuery.isPlainObject(src)) {
            clone = {};
          } else {
            clone = src;
          }
          copyIsArray = false;
          // Never move original objects, clone them
          target[name] = jQuery.extend(deep, clone, copy);

          // Don't bring in undefined values
        } else if (copy !== undefined) {
          target[name] = copy;
        }
      }
    }
  }
  // Return the modified object
  return target;
}


jQuery.extend({

  // Unique for each copy of jQuery on the page
  expando: "jQuery" + (version + Math.random()).replace(/\D/g, ""),

  // Assume jQuery is ready without the ready module
  isReady: true,

  error: function (msg) {
    throw new Error(msg);
  },

  noop: function () { },

  isPlainObject: function (obj) {
    var proto, Ctor;

    // Detect obvious negatives
    // Use toString instead of jQuery.type to catch host objects
    if (!obj || toString.call(obj) !== "[object Object]") {
      return false;
    }

    proto = Object.getPrototypeOf(obj);

    // Objects with no prototype (e.g., `Object.create( null )`) are plain
    if (!proto) {
      return true;
    }

    // Objects with prototype are plain iff they were constructed by a global Object function
    Ctor = {}.hasOwnProperty.call(proto, "constructor") && proto.constructor;
    return typeof Ctor === "function" && {}.hasOwnProperty.toString.call(Ctor) === {}.hasOwnProperty.toString.call(Object);
  },

  isEmptyObject: function (obj) {
    var name;

    for (name in obj) {
      return false;
    }
    return true;
  },

  // Evaluates a script in a provided context; falls back to the global one
  // if not specified.
  globalEval: function (code, options, doc) {
    DOMEval(code, { nonce: options && options.nonce }, doc);
  },

  each: function (obj, callback) {
    var length, i = 0;

    if (isArrayLike(obj)) {
      length = obj.length;
      for (; i < length; i++) {
        if (callback.call(obj[i], i, obj[i]) === false) {
          break;
        }
      }
    } else {
      for (i in obj) {
        if (callback.call(obj[i], i, obj[i]) === false) {
          break;
        }
      }
    }

    return obj;
  },


  // Retrieve the text value of an array of DOM nodes
  text: function (elem) {
    var node,
      ret = "",
      i = 0,
      nodeType = elem.nodeType;

    if (!nodeType) {

      // If no nodeType, this is expected to be an array
      while ((node = elem[i++])) {

        // Do not traverse comment nodes
        ret += jQuery.text(node);
      }
    } else if (nodeType === 1 || nodeType === 9 || nodeType === 11) {
      return elem.textContent;
    } else if (nodeType === 3 || nodeType === 4) {
      return elem.nodeValue;
    }

    // Do not include comment or processing instruction nodes

    return ret;
  },


  // results is for internal usage only
  makeArray: function (arr, results) {
    var ret = results || [];

    if (arr != null) {
      if (isArrayLike(Object(arr))) {
        jQuery.merge(ret,
          typeof arr === "string" ?
            [arr] : arr
        );
      } else {
        [].push.call(ret, arr);
      }
    }

    return ret;
  },

  inArray: function (elem, arr, i) {
    return arr == null ? -1 : [].indexOf.call(arr, elem, i);
  },

  isXMLDoc: function (elem) {
    var namespace = elem && elem.namespaceURI,
      docElem = elem && (elem.ownerDocument || elem).documentElement;

    // Assume HTML when documentElement doesn't yet exist, such as inside
    // document fragments.
    return !rhtmlSuffix.test(namespace || docElem && docElem.nodeName || "HTML");
  },

  // Note: an element does not contain itself
  contains: function (a, b) {
    var bup = b && b.parentNode;

    return a === bup || !!(bup && bup.nodeType === 1 && (

      // Support: IE 9 - 11+
      // IE doesn't have `contains` on SVG.
      a.contains ?
        a.contains(bup) :
        a.compareDocumentPosition && a.compareDocumentPosition(bup) & 16
    ));
  },

  merge: function (first, second) {
    var len = +second.length,
      j = 0,
      i = first.length;

    for (; j < len; j++) {
      first[i++] = second[j];
    }

    first.length = i;

    return first;
  },

  grep: function (elems, callback, invert) {
    var callbackInverse,
      matches = [],
      i = 0,
      length = elems.length,
      callbackExpect = !invert;

    // Go through the array, only saving the items
    // that pass the validator function
    for (; i < length; i++) {
      callbackInverse = !callback(elems[i], i);
      if (callbackInverse !== callbackExpect) {
        matches.push(elems[i]);
      }
    }

    return matches;
  },

  // arg is for internal usage only
  map: function (elems, callback, arg) {
    var length, value,
      i = 0,
      ret = [];

    // Go through the array, translating each of the items to their new values
    if (isArrayLike(elems)) {
      length = elems.length;
      for (; i < length; i++) {
        value = callback(elems[i], i, arg);

        if (value != null) {
          ret.push(value);
        }
      }

      // Go through every key on the object,
    } else {
      for (i in elems) {
        value = callback(elems[i], i, arg);

        if (value != null) {
          ret.push(value);
        }
      }
    }

    // Flatten any nested arrays
    return flat(ret);
  },

  // A global GUID counter for objects
  guid: 1,

  // jQuery.support is not used in Core but other projects attach their
  // properties to it so it needs to exist.
  support: {}
});

if (typeof Symbol === "function") {
  jQuery.fn[Symbol.iterator] = [][Symbol.iterator];
}

// Populate the class2type map
jQuery.each("Boolean Number String Function Array Date RegExp Object Error Symbol".split(" "),
  function (_i, name) {
    class2type["[object " + name + "]"] = name.toLowerCase();
  });

export default jQuery;