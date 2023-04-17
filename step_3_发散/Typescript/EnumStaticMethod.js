var Weekday;
(function (Weekday) {
  Weekday[Weekday["Monday"] = 0] = "Monday";
  Weekday[Weekday["Tuesday"] = 1] = "Tuesday";
  Weekday[Weekday["Wednesday"] = 2] = "Wednesday";
  Weekday[Weekday["Thursday"] = 3] = "Thursday";
  Weekday[Weekday["Friday"] = 4] = "Friday";
  Weekday[Weekday["Saturday"] = 5] = "Saturday";
  Weekday[Weekday["Sunday"] = 6] = "Sunday";
})(Weekday || (Weekday = {}));
(function (Weekday) {
  function isBusinessDay(day) {
    switch (day) {
      case Weekday.Saturday:
      case Weekday.Sunday:
        return false;
      default:
        return true;
    }
  }
  Weekday.isBusinessDay = isBusinessDay;
})(Weekday || (Weekday = {}));
const mon = Weekday.Monday;
const sun = Weekday.Sunday;
console.log(Weekday.isBusinessDay(mon));
console.log(Weekday.isBusinessDay(sun));

class Number {
  x;
}


let s = new Number();