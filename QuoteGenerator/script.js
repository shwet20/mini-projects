// List of quotes
const quotes = [
    "The only limit to our realization of tomorrow is our doubts of today. - Franklin D. Roosevelt",
    "The purpose of our lives is to be happy. - Dalai Lama",
    "Life is what happens when you're busy making other plans. - John Lennon",
    "Get busy living or get busy dying. - Stephen King",
    "You have within you right now, everything you need to deal with whatever the world can throw at you. - Brian Tracy",
    "Believe you can and you're halfway there. - Theodore Roosevelt",
    "The only way to do great work is to love what you do. - Steve Jobs",
    "The best time to plant a tree was 20 years ago. The second best time is now. - Chinese Proverb",
    "It does not matter how slowly you go as long as you do not stop. - Confucius",
    "Everything you’ve ever wanted is on the other side of fear. - George Addair"
];

let currentQuoteIndex = 0;

// Function to create and style the quote generator
function createQuoteGenerator() {
    // Create the container for the entire UI
    const container = document.createElement('div');
    container.style.width = '100vw';
    container.style.height = '100vh';
    container.style.display = 'flex';
    container.style.flexDirection = 'column';
    container.style.justifyContent = 'center';
    container.style.alignItems = 'center';
    container.style.textAlign = 'center';
    container.style.fontFamily = 'Arial, sans-serif';

    // Create the heading
    const heading = document.createElement('h1');
    heading.innerText = 'Quote Generator';
    heading.style.marginBottom = '20px';
    container.appendChild(heading);

    // Create the quote card
    const quoteCard = document.createElement('div');
    quoteCard.style.width = '500px';
    quoteCard.style.height = '300px';
    quoteCard.style.padding = '20px';
    quoteCard.style.border = '1px solid #ccc';
    quoteCard.style.borderRadius = '5px';
    quoteCard.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
    quoteCard.style.marginBottom = '20px';
    quoteCard.style.transition = 'background-color 0.5s ease';
    quoteCard.style.display = 'flex';
    quoteCard.style.alignItems = 'center';
    quoteCard.style.justifyContent = 'center';
    quoteCard.style.textAlign = 'center';

    // Create the quote display
    const quoteDisplay = document.createElement('p');
    quoteDisplay.style.fontSize = '18px';
    quoteDisplay.style.fontStyle = 'italic';
    quoteDisplay.style.margin = '0';
    quoteDisplay.id = 'quoteDisplay';
    quoteCard.appendChild(quoteDisplay);

    container.appendChild(quoteCard);

    // Create the button container
    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'flex';
    buttonContainer.style.gap = '10px';

    // Create the previous button
    const prevButton = document.createElement('button');
    prevButton.innerText = 'Previous';
    styleButton(prevButton);
    prevButton.addEventListener('click', () => displayPreviousQuote(quoteDisplay, quoteCard));
    buttonContainer.appendChild(prevButton);

    // Create the next button
    const nextButton = document.createElement('button');
    nextButton.innerText = 'Next';
    styleButton(nextButton);
    nextButton.addEventListener('click', () => displayNextQuote(quoteDisplay, quoteCard));
    buttonContainer.appendChild(nextButton);

    container.appendChild(buttonContainer);

    document.body.appendChild(container);

    // Display the first quote initially
    displayQuote(quoteDisplay, quoteCard);
}

// Function to style buttons
function styleButton(button) {
    button.style.padding = '10px 20px';
    button.style.fontSize = '16px';
    button.style.cursor = 'pointer';
    button.style.borderRadius = '5px';
    button.style.border = '1px solid black';
    button.style.backgroundColor = 'white';
    button.style.color = 'black';

    // Add hover effect
    button.addEventListener('mouseenter', () => {
        button.style.backgroundColor = 'gray';
        button.style.color = 'white';
    });
    button.addEventListener('mouseleave', () => {
        button.style.backgroundColor = 'white';
        button.style.color = 'black';
    });
}

// Function to display the current quote with a random background color
function displayQuote(quoteDisplay, quoteCard) {
    quoteDisplay.innerText = quotes[currentQuoteIndex];
    quoteCard.style.backgroundColor = getRandomColor();
}

// Function to display the previous quote
function displayPreviousQuote(quoteDisplay, quoteCard) {
    if (currentQuoteIndex > 0) {
        currentQuoteIndex--;
    } else {
        currentQuoteIndex = quotes.length - 1; // Loop back to the last quote
    }
    displayQuote(quoteDisplay, quoteCard);
}

// Function to display the next quote
function displayNextQuote(quoteDisplay, quoteCard) {
    if (currentQuoteIndex < quotes.length - 1) {
        currentQuoteIndex++;
    } else {
        currentQuoteIndex = 0; // Loop back to the first quote
    }
    displayQuote(quoteDisplay, quoteCard);
}

// Function to generate a random color
function getRandomColor() {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
}

// Initialize the quote generator
createQuoteGenerator();
