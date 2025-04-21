import { MAIN_PAGE_KEY } from "../constants/constants";

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



