export default function toType(obj) {
  if (obj === null) {
    return obj + '';
  }
  return typeof obj === 'object'
    ? {}[{}.toString.call(obj)] || 'object'
    : typeof obj;
}