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
