const periodsButtons = document.querySelectorAll('.period-btn');

let onPeriodSelected: ((period: string) => void) | null = null;

// Function to detect period selection externally 
export function setOnPeriodSelected(callback: (period: string) => void) {
    onPeriodSelected = callback;
}

// Set up click event for each button 
periodsButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const selectedPeriod = button.getAttribute('data-period');

        if (onPeriodSelected) {
            onPeriodSelected(selectedPeriod as string); // Call the callback
        }
    });
})