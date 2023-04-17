interface Padding {
  top: number;
  right: number;
  bottom: number;
  left: number;
}
function padding(all: number): Padding;
function padding(topAndBottom: number, leftAndRight: number): Padding;
function padding(top: number, right: number, bottom: number, left: number): Padding;
function padding(a: number, b?: number, c?: number, d?: number): Padding {
  if (b === undefined && c === undefined && d === undefined) {
    b = c = d = a;
  } else if (c === undefined && d === undefined) {
    c = a;
    d = b;
  }
  return { top: a, right: b, bottom: c, left: d };
}