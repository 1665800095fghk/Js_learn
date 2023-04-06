// DOM 变动观测器 - MutationObserver
let observer = new MutationObserver(mutationRecords => {
  console.log(mutationRecords);
});
observer.observe(elem, {
  childList: true,
  subtree: true, 
  characterData: true,
  characterDataOldValue: true
});