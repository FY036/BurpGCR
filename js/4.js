document.addEventListener('DOMContentLoaded', function() {
  var fixButton = document.getElementById('fixButton');
  fixButton.addEventListener('click', handleFixGarbledText);
});

function fixGarbledText(text) {
  const encodings = ['UTF-8', 'ISO-8859-1', 'GBK', 'Big5'];
  let fixedText = '';

  for (const encoding of encodings) {
    try {
      const decoder = new TextDecoder(encoding);
      const decodedText = decoder.decode(new Uint8Array([...text].map(c => c.charCodeAt(0))));
      fixedText = decodedText;
      break;
    } catch (error) {
      continue;
    }
  }

  return fixedText;
}

function handleFixGarbledText() {
  const inputText = document.getElementById('inputText').value;
  const fixedText = fixGarbledText(inputText);
  document.getElementById('fixedText').textContent = fixedText;
  Prism.highlightAll();
}