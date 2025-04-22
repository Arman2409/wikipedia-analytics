import { CLICKED_BUTTON_CLASSLIST } from "../constants/constants";


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
        updateClickedButton(selectedPeriod as string);

        // Call period selection callback
        if (onPeriodSelected) {
            onPeriodSelected(selectedPeriod as string); // Call the callback
        }
    });
})

export function updateClickedButton(period: number | string) {
    const allPeriodButtons = document.querySelectorAll(".period-btn");

    allPeriodButtons.forEach((button) => {
        CLICKED_BUTTON_CLASSLIST.forEach(className => {
            button.classList.remove(className);
        })
    });

    const selectedPeriod = document.querySelector(`.period-btn[data-period="${period}"]`);

    if (selectedPeriod) {
        CLICKED_BUTTON_CLASSLIST.forEach(className => {
            selectedPeriod.classList.add(className);
        })
    } else {
        console.error(`Button with data-period "${period}" not found.`);
    }
};