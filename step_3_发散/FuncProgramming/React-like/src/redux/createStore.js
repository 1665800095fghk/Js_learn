export default function createStore(reducer, preloadedState, enhancer) {
  if (typeof preloadedState === "function" && typeof enhancer === "undefined") {
    enhancer = preloadedState;
    preloadedState = undefined;
  }
  if (typeof enhancer === "function") {
    return enhancer(createStore)(reducer, preloadedState);
  }

  let state = preloadedState;
  const listeners = [];
  function getState() {
    return state;
  }
  function subscribe(listener) {
    listeners.push(listener);
    return function unsubscribe() {
      const index = listeners.indexOf(listener);
      listeners.splice(index, 1);
    }
  }
  function dispatch(action) {
    state = reducer(state, action);
    listeners.forEach((listener) => listener());
    return action;
  }

  dispatch({
    type: "@@redux/INIT"
  });

  return {
    getState,
    dispatch,
    subscribe
  }
}
