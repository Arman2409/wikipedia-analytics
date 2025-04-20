const periodsButtons = document.querySelectorAll('.period-btn');

let onPeriodSelected: ((period: string, event: Event) => void) | null = null;

export function setOnPeriodSelected(callback: (period: string, event: Event) => void) {
    onPeriodSelected = callback;
}

periodsButtons.forEach((button) => {
    button.addEventListener('click', (event: Event) => {
        event.preventDefault();
        event.stopPropagation();

        const selectedPeriod = button.getAttribute('data-period');
        // const customEvent = new CustomEvent('periodSelected', { detail: selectedPeriod });

        if (onPeriodSelected) {
            onPeriodSelected(selectedPeriod as string, event); // Call the callback
        }
    });
})