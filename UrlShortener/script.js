const urlDatabase = JSON.parse(localStorage.getItem('urlDatabase')) || {};
const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
const base = characters.length;

function generateShortCode() {
    let shortCode = '';
    for (let i = 0; i < 6; i++) {
        shortCode += characters[Math.floor(Math.random() * base)];
    }
    return shortCode;
}

function encodeURL(longURL) {
    let shortCode;
    do {
        shortCode = generateShortCode();
    } while (urlDatabase[shortCode]);
    urlDatabase[shortCode] = longURL;
    localStorage.setItem('urlDatabase', JSON.stringify(urlDatabase));
    return `http://short.url/${shortCode}`;
}

function decodeURL(shortURL) {
    const shortCode = shortURL.replace('http://short.url/', '');
    return urlDatabase[shortCode];
}

document.getElementById('shorten-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const longURL = document.getElementById('long-url').value;
    const shortURL = encodeURL(longURL);
    const shortUrlElement = document.createElement('a');
    shortUrlElement.href = shortURL;
    shortUrlElement.textContent = shortURL;
    shortUrlElement.addEventListener('click', function(event) {
        event.preventDefault();
        const originalURL = decodeURL(shortURL);
        if (originalURL) {
            window.location.href = originalURL;
        } else {
            alert('The short URL does not exist.');
        }
    });
    const shortUrlContainer = document.getElementById('short-url');
    shortUrlContainer.innerHTML = 'Shortened URL: ';
    shortUrlContainer.appendChild(shortUrlElement);
});

document.getElementById('decode-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const shortURL = document.getElementById('short-url-input').value;
    const longURL = decodeURL(shortURL);
    if (longURL) {
        const longUrlElement = document.createElement('a');
        longUrlElement.href = longURL;
        longUrlElement.textContent = longURL;
        document.getElementById('long-url-output').innerHTML = 'Original URL: ';
        document.getElementById('long-url-output').appendChild(longUrlElement);
    } else {
        document.getElementById('long-url-output').innerHTML = 'Short URL does not exist';
    }
});
