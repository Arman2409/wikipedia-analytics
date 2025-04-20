import { MAIN_PAGE_KEY } from "../configs/constants";
import type { PageViewsResponse } from "../types/global";

// TODO make any to unknown 
export const debounce = <T extends (...args: any[]) => void>(func: T, wait: number): (
  ...args: Parameters<T>
) => void => {
  let timeout: NodeJS.Timeout | null;

  return function (...args: Parameters<T>) {
    if (timeout) clearTimeout(timeout);

    timeout = setTimeout(() => func(...args), wait);
  };
}


export const getCssVariable = (variableName: string): string => {
  const root = document.documentElement;
  const value = getComputedStyle(root).getPropertyValue(variableName);

  return value ? value.trim() : "";
}

export const safeParse = (input: string) => {
  try {
    return JSON.parse(input);
  } catch (_) {
    return input;
  }
}

export const getPageName = (name: string) => {
  if (name === MAIN_PAGE_KEY) {
    return "Main Page";
  }
  return name;
}

export const procesGetPageResult = (
  result: PageViewsResponse,
  selectedPage: string,
  statisticsPageName: HTMLSpanElement,
  updateChart: (labels: string[], views: number[]) => void
) => {
  if (result) {
    const { labels, views } = { ...result };

    if (statisticsPageName) statisticsPageName.innerHTML = getPageName(selectedPage);

    updateChart(labels, views)
  }
}