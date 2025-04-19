import "./components/searchbar";
import "./components/periodButtons";
import "./components/barChart";
import myChart from "./components/barChart";
import { LocalStorageCache } from './utils/cache';
import RequestHandler from './api/request';
import { setOnPeriodSelected } from './components/periodButtons';

const cache = new LocalStorageCache('page_view_');


setOnPeriodSelected(async (selectedPeriod, event) => {
    try {
        if (event) event.preventDefault(); // Prevent form submission or default action
        const result = await RequestHandler.getPageData("Facebook", selectedPeriod);
        console.log({ result });
    } catch (error) {
        console.error('Error in onPeriodSelected callback:', error);
    }
});

