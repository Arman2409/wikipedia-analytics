import LocalStorageCacheHandler from './services/cache';
import RequestHandler from './services/request';
import store from "./state/store";
import "./components/searchbar";
import "./components/periodButtons";
import "./components/barChart";
import { updateChart } from "./components/barChart";
import { setOnPeriodSelected } from './components/periodButtons';
import { procesGetPageResult } from './utils/helpers';
import { INITIAL_SELECTED_PERIOD } from './configs/configs';
import type { PageViewsResponse } from "./types/global";

const cache = new LocalStorageCacheHandler('page_view_');

const { getSelectedPage } = store;

const statisticsPageName = document.querySelector(".statistics-page-name") as HTMLSpanElement;

// Get Main page data for initial view 
(async function getInitialData() {
    const selectedPage = getSelectedPage();

    const result = await RequestHandler.getPageData(selectedPage, INITIAL_SELECTED_PERIOD);

    procesGetPageResult(result, selectedPage, statisticsPageName, updateChart);
})()

// Handle period change event 
setOnPeriodSelected(async selectedPeriod => {
    try {
        const selectedPage = getSelectedPage();

        let result: PageViewsResponse;

        // Check if the requested data is available in cache, otherwise send a request
        const cachedResult = cache.get<PageViewsResponse>(selectedPage, selectedPeriod);

        if (cachedResult) {
            result = cachedResult;
        } else {
            result = await RequestHandler.getPageData(selectedPage, selectedPeriod);

            cache.set(selectedPage, result, selectedPeriod);
        }

        procesGetPageResult(result, selectedPage, statisticsPageName, updateChart)

    } catch (error) {
        console.error('Error in onPeriodSelected callback:', error);
    }
});

