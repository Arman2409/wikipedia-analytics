import { INITIAL_SELECTED_PERIOD } from "../constants/configs";
import { MAIN_PAGE_KEY } from "../constants/constants";

const stateManager = (() => {
    let selectedPage = MAIN_PAGE_KEY;
    let selectedPeriod = INITIAL_SELECTED_PERIOD;

    const getSelectedPage = () => selectedPage;

    const getSelectedPeriod = () => selectedPeriod;

    const updateSelectedPage = (newPage: string) => {
        selectedPage = newPage;
    };

    const updateSelectedPeriod = (newPeriod: string) => {
        selectedPeriod = newPeriod;
    };

    return {
        getSelectedPage,
        getSelectedPeriod,
        updateSelectedPage,
        updateSelectedPeriod,
    };
})();

export default stateManager;
