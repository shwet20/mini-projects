// Function to create and style the calculator
function createCalculator() {
    // Create the container
    const container = document.createElement('div');
    container.style.width = '220px';
    container.style.margin = '100px auto';
    container.style.padding = '10px';
    container.style.border = '1px solid #ccc';
    container.style.borderRadius = '5px';
    container.style.boxShadow = '0 0 10px rgba(0, 0, 0, 0.1)';
    container.style.textAlign = 'center';
    container.style.fontFamily = 'Arial, sans-serif';

    // Create the display
    const display = document.createElement('input');
    display.type = 'text';
    display.style.width = '200px';
    display.style.marginBottom = '10px';
    display.style.padding = '10px';
    display.style.fontSize = '18px';
    display.style.textAlign = 'right';
    display.disabled = true;
    display.id = 'display';
    container.appendChild(display);

    // Create the buttons
    const buttons = [
        '7', '8', '9', '/',
        '4', '5', '6', '*',
        '1', '2', '3', '-',
        '0', '.', '=', '+',
        'C'
    ];

    // Create a grid container for the buttons
    const buttonContainer = document.createElement('div');
    buttonContainer.style.display = 'grid';
    buttonContainer.style.gridTemplateColumns = 'repeat(4, 1fr)';
    buttonContainer.style.gap = '5px';

    buttons.forEach(button => {
        const btn = document.createElement('button');
        btn.innerText = button;
        btn.style.width = '100%';
        btn.style.height = '40px';
        btn.style.fontSize = '18px';
        btn.style.cursor = 'pointer';
        btn.style.borderRadius = '5px';

        btn.addEventListener('click', () => handleButtonClick(button, display));
        buttonContainer.appendChild(btn);
    });

    container.appendChild(buttonContainer);
    document.body.appendChild(container);
}

// Function to handle button clicks
function handleButtonClick(value, display) {
    if (value === 'C') {
        display.value = '';
    } else if (value === '=') {
        try {
            display.value = eval(display.value) || '';
        } catch {
            display.value = 'Error';
        }
    } else {
        if (display.value === 'Error') {
            display.value = '';
        }
        display.value += value;
    }
}

// Initialize the calculator
createCalculator();
