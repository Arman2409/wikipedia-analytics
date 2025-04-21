import RequestHandler from '../services/request';
import LocalStorageCacheHandler from '../services/cache';
import store from "../state/store";
import { updateChart } from "../components/barChart";
import { getPageName } from './helpers';
import { toggleLoading } from '../components/loading';
import type { PageViewsResponse } from "../types/global";


const { getSelectedPage, getSelectedPeriod } = store;

const cache = new LocalStorageCacheHandler('page_view_');

const statisticsPageName = document.querySelector(".statistics-page-name") as HTMLSpanElement;

export const handleGetPageData = async (
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
        procesGetPageResult(result, selectedPage, updateChart)
    } catch (error) {
        console.error('Error handling period change:', error);
    }
}
export const procesGetPageResult = (
    result: PageViewsResponse,
    selectedPage: string,
    updateChart: (labels: string[], views: number[]) => void
) => {
    if (result) {
        const { labels, views } = { ...result };

        if (statisticsPageName) statisticsPageName.innerHTML = getPageName(selectedPage);

        toggleLoading(false);
        updateChart(labels, views);
    }
}