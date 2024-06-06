let textBox = document.getElementById('text-box');
let charCount = document.getElementById('char-count');
let wordCount = document.getElementById('word-count');
let lineCount = document.getElementById('line-count');

textBox.addEventListener('input', () => {
    let text = textBox.value;
    charCount.textContent = text.length;
    wordCount.textContent = text.trim() ? text.trim().split(/\s+/).length : 0;
    lineCount.textContent = text ? text.split('\n').length : 0;
});
