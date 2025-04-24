import { INITIAL_SELECTED_PERIOD } from "../constants/configs";
import { CLICKED_BUTTON_CLASSLIST } from "../constants/constants";
import store from "../state/store";
import handleGetPageData from "../handlers/handlegetPageData";


const { updateSelectedPeriod, getSelectedPeriod } = {...store }

const periodsButtons = document.querySelectorAll('.period-btn');

// Set up click event for each button 
periodsButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const buttonPeriod = button.getAttribute('data-period');
        const selectedPeriod = getSelectedPeriod();

        // Check if the period is already selected 
        if (buttonPeriod === selectedPeriod) {
            return;
        }

        if (buttonPeriod) {
            updateClickedButton(buttonPeriod);
            updateSelectedPeriod(buttonPeriod);

            // Get page data
            handleGetPageData(buttonPeriod);
        }
    });
});

// Get Main page data for initial view 
(async function getInitialData() {
    updateClickedButton(INITIAL_SELECTED_PERIOD);

    handleGetPageData();
})()

export function updateClickedButton(
    period: number | string
) {
    const allPeriodButtons = document.querySelectorAll(".period-btn");

    // Remove clicked button styles from other buttons 
    allPeriodButtons.forEach((button) => {
        CLICKED_BUTTON_CLASSLIST.forEach(className => {
            button.classList.remove(className);
        })
    });

    const selectedPeriodButton = document.querySelector(`.period-btn[data-period="${period}"]`);

    if (selectedPeriodButton) {
        CLICKED_BUTTON_CLASSLIST.forEach(className => {
            selectedPeriodButton.classList.add(className);
        })
    } else {
        console.error(`Button with data-period "${period}" not found.`);
    }
};