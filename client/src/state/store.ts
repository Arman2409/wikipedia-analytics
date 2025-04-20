import { MAIN_PAGE_KEY } from "../configs/configs";

const stateManager = (() => {
    let selectedPage = MAIN_PAGE_KEY;

    const getSelectedPage = () => selectedPage;

    const updateSelectedPage = (newPage: string) => {
        selectedPage = newPage;
    };

    return {
        getSelectedPage,
        updateSelectedPage,
    };
})();

export default stateManager;
