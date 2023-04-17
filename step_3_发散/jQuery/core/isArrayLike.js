import toType from "./toType";
import isWindow from './../var/isWindow';

export default function isArrayLike(obj) {
  let length = !!obj && obj.length;
  let type = toType(obj);
  if (typeof obj === 'function' || isWindow(obj)) {
    return false;
  }
  return type === 'array' || length === 0 ||
    typeof length === 'number' && length > 0 && (length - 1) in obj;
}