let textBox = document.getElementById('text-box');
let charCount = document.getElementById('char-count');
let wordCount = document.getElementById('word-count');
let lineCount = document.getElementById('line-count');
let shareButton = document.getElementById('share-button');

textBox.addEventListener('input', () => {
    let text = textBox.value;
    charCount.textContent = text.length;
    wordCount.textContent = text.trim() ? text.trim().split(/\s+/).length : 0;
    lineCount.textContent = text ? text.split('\n').length : 0;
});

shareButton.addEventListener('click', async () => {
    let text = textBox.value;
    location.hash = encodeURIComponent(text);
    let url = location.href;
    if (navigator.canShare) {
        if (navigator.canShare({text})) {
            try {
                await navigator.share({text});
                return;
            } catch {}
        } else if (navigator.canShare({url})) {
            try {
                await navigator.share({url});
                return;
            } catch {}
        }
    }

    // fall back to copying the link if sharing fails
    try {
        await navigator.clipboard.writeText(url);
        shareButton.textContent = '✓ Link copied to clipboard';
    } catch {
        shareButton.textContent = '✓ Updated URL'
    }
});

if (location.hash) {
    // if a hash is present, try to decode and fill the text box
    textBox.value = decodeURIComponent(location.hash.slice(1));
}