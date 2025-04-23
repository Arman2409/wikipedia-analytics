import type { ChartColor } from "../types/barChart";

export const MAIN_PAGE_KEY = "Main_Page";

export const CLICKED_BUTTON_CLASSLIST = ["border-primary", "text-accent"];

export const GET_PAGE_CHACHE_PREFIX = 'page_view_';

export const CHART_BORDER_WIDTH = 1;

export const CHART_COLORS = new Map<ChartColor, string>([
    ["previousBar", "secondary"],
    ["currentBar", "text"],
    ["border", "accent"],
]);