import { INITIAL_SELECTED_PERIOD } from './constants/configs';
import { handleGetPageData } from './utils/dataHandlers';
import "./components/searchBar";
import "./components/periodButtons";
import "./components/barChart";
import { setOnPeriodSelected, updateClickedButton } from './components/periodButtons';
import { setOnSuggestionSelected } from './components/searchBar';


// Get Main page data for initial view 
(async function getInitialData() {
    updateClickedButton(INITIAL_SELECTED_PERIOD);

    handleGetPageData();
})()


// Handle period change event 
setOnPeriodSelected(async selectedPeriod => {
    handleGetPageData(selectedPeriod);
});

// Handle page selection event
setOnSuggestionSelected(async pageName => {
    handleGetPageData(undefined, pageName);
});

