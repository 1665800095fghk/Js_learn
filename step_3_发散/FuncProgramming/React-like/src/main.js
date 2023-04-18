import { createStore } from "./redux";

const container = document.getElementById("counter");
const button = document.getElementById("button");

const reducer = (state = 0, action) => {
  switch (action.type) {
    case "@@redux/INIT":
      return state;
    case "counter/increment":
      return state + 1;
    default:
      return state;
  }
};

const store = createStore(reducer, 0);

const render = () => {
  console.log(store.getState());
  container.innerHTML = store.getState();
};

const unsubscribe = store.subscribe(render);

button.addEventListener("click", () => {
  store.dispatch({
    type: "counter/increment",
  });
});
