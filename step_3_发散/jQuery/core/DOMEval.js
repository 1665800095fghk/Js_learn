let preservedScriptAttributes = {
  type: true,
  src: true,
  nonce: true,
  noModule: true
};

function DOMEval(code, node , doc) {
  doc = doc || document;
  let i, script = doc.createElement('script');
  script.text = code;
  if(node) {
    for(i in preservedScriptAttributes) {
      if(node[i]) {
        script[i] = node[i];
      }
    }
  }
  doc.head.appendChild(script).parentNode.removeChild(script);
}

export default DOMEval;