export const getFormattedDate = (dateNumber: number) => {
  const date = new Date(dateNumber);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based, so +1
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}${month}${day}`;
};


export const safeParse = (input: string) => {
  try {
    return JSON.parse(input);
  } catch (_) {
    return input;
  }
}
