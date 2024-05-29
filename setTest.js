document.addEventListener('DOMContentLoaded', () => {
    // Function that returns a promise which resolves after three button presses
    function waitForThreeButtonPresses() {
        return new Promise((resolve) => {
            const buttonContainer = document.getElementById('buttonContainer');
            let pressCount = 0;

            function buttonClickHandler(event) {
                if (event.target && event.target.classList.contains('myButton')) {
                    pressCount++;
                    console.log(`Button ${event.target.getAttribute('data-button-id')} was pressed.`);
                    if (pressCount === 3) {
                        // Remove the event listener once we reach three presses
                        buttonContainer.removeEventListener('click', buttonClickHandler);
                        resolve(); // Resolve the promise
                    }
                }
            }

            // Add event listener to the button container
            buttonContainer.addEventListener('click', buttonClickHandler);
        });
    }

    // Use an async function to wait for the button presses
    async function main() {
        console.log('Waiting for three button presses...');
        await waitForThreeButtonPresses();
        console.log('Three button presses detected. Continuing with the next part of the code...');
        // Place your code here that should run after three button presses
    }

    // Start the main function
    main();
});