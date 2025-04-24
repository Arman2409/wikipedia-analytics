import { MAIN_PAGE_KEY } from "../constants/constants";

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


export const sliceString = (
  str: string, 
  length: number, 
  ): string => {
  if (typeof str !== 'string') return '';

  if(str.length <= length) return str;

  return str.slice(0, length) + '...';
}
