import { GET_PAGE_CHACHE_PREFIX } from '../constants/constants';
import { getPageName } from '../utils/helpers';
import RequestHandler from '../services/request';
import LocalStorageCacheHandler from '../services/cache';
import store from "../state/store";
import { updateChart } from "../components/barChart";
import { toggleLoading } from '../components/loading';
import type { PageViewsResponse } from "../types/global";


const { getSelectedPage, getSelectedPeriod } = store;

const cache = new LocalStorageCacheHandler(GET_PAGE_CHACHE_PREFIX);

const handleGetPageData = async (
    selectedPeriod?: string,
    selectedPage?: string,
) => {
    try {
        toggleLoading(true);

        if (!selectedPage) selectedPage = getSelectedPage();
        if (!selectedPeriod) selectedPeriod = getSelectedPeriod();

        let result: PageViewsResponse;

        // Check if the requested data is available in cache, otherwise send a request
        const cachedResult = cache.get<PageViewsResponse>(selectedPage, selectedPeriod);

        if (cachedResult) {
            result = cachedResult;
        } else {
            result = await RequestHandler.getPageData(selectedPage, selectedPeriod);

            cache.set(selectedPage, result, selectedPeriod);
        }

        // Update the chart 
        processGetPageResult(result, selectedPage, updateChart)
    } catch (error) {
        console.error('Error handling period change:', error);
    }
}

const statisticsPageName = document.querySelector(".statistics-page-name") as HTMLSpanElement;

function processGetPageResult(
    result: PageViewsResponse,
    selectedPage: string,
    updateChart: (data: PageViewsResponse) => void
) {
    if (result) {
        if (statisticsPageName) statisticsPageName.innerHTML = getPageName(selectedPage);

        toggleLoading(false);
        updateChart(result);
    }
}

export default handleGetPageData;