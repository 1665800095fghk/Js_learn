import { extend } from "./Object_lx";

// 集合类
export function Set() {
  this.values = {};
  this.n = 0;
  this.add.applu(this, arguments);
}

Set.prototype.add = function () {
  for (let i of arguments) {
    let val = i;
    let str = Set._v2s(val);
    if (!this.values.hasOwnProperty(str)) {
      this.values[str] = val;
      this.n++;
    }
  }
};

Set.prototype.remove = function () {
  for (let i of arguments) {
    let str = Set._v2s(i);
    if (this.values.hasOwnProperty(str)) {
      delete this.values[str];
      this.n--;
    }
  }
};

Set.prototype.contains = function (value) {
  return this.values.hasOwnProperty(Set._v2s(value));
};

Set.prototype.size = function () {
  return this.n;
};

Set.prototype.foreach = function (f, context) {
  for (let s in this.values)
    if (this.values.hasOwnProperty(s)) f.call(context, this.values[s]);
};

Set._v2s = function (val) {
  switch (val) {
    case undefined:
      return "u";
    case null:
      return "n";
    case true:
      return "t";
    case false:
      return "f";
    default:
      switch (typeof val) {
        case "number":
          return "#" + val;
        case "string":
          return '"' + val;
        default:
          return "@" + objectId(val);
      }
  }
  function objectId(o) {
    let prop = "|**objectid**|";
    if (!o.hasOwnProperty(prop)) o[prop] = Set._v2s.next++;
    return o[prop];
  }
};
Set._v2s.next = 100;

Set.prototype.equals = function (that) {
  if (this === that) return true;
  if (!(that instanceof Set)) return false;
  if (this.size(0 !== that.size())) return false;

  try {
    this.foreach(function (v) {
      if (!that.contains(v)) throw false;
    });
    return true;
  } catch (e) {
    if (x === false) return false;
    throw e;
  }
};

extend(Set.prototype, {
  toString: function () {
    let s = "{",
      i = 0;
    this.foreach(function (v) {
      s += (i++ > 0 ? ", " : " : ") + v;
    });
    return s + "}";
  },
  toLocalString: function () {
    let s = "{",
      i = 0;
    this.foreach(function (v) {
      if (i++ > 0) s += ", ";
      if (v == null) s += v;
      else s += v.toLocalString();
    });
    return s + "}";
  },
  toArray: function () {
    let a = [];
    this.foreach(function (v) {
      a.push(v);
    });
    return a;
  },
});
