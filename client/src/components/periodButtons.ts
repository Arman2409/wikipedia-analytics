import { INITIAL_SELECTED_PERIOD } from "../constants/configs";
import { CLICKED_BUTTON_CLASSLIST } from "../constants/constants";
import store from "../state/store";
import handleGetPageData from "../handlers/handlegetPageData";

const { updateSelectedPeriod } = {...store }

const periodsButtons = document.querySelectorAll('.period-btn');

// Set up click event for each button 
periodsButtons.forEach((button) => {
    button.addEventListener('click', () => {
        const selectedPeriod = button.getAttribute('data-period');

        if (selectedPeriod) {
            updateClickedButton(selectedPeriod);
            updateSelectedPeriod(selectedPeriod);

            handleGetPageData(selectedPeriod);
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