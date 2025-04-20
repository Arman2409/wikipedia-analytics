import { periodsMap } from '../../controllers/utils/periods';
import type { PageViewsItem, PageViewsResponse } from '../../types/getViews';


const formatTimestamp = (
  timestamp: string,
  granularity: string
): string => {
  const date = new Date(Number(`${timestamp.slice(0, 8)}0000`));

  if (granularity === 'daily') {

    return String(date.getDate());

  } else if (granularity === 'weekly') {

    const startOfWeek = new Date(date);
    startOfWeek.setDate(date.getDate() - date.getDay());
    return startOfWeek.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  } else if (granularity === 'monthly') {

    return date.getMonth().toLocaleString();
  }

  throw new Error(`Unsupported granularity: ${granularity}`);
}


export const transformPageViews = (
  data: PageViewsItem[],
  period: number
): PageViewsResponse => {
  const granularity = periodsMap.get(period);

  if (!granularity) {
    throw new Error(`Invalid period: ${period}`);
  }

  if (granularity === 'weekly') {
    const weeklyMap = new Map<string, number>();

    data.forEach((item) => {
      const date = new Date(Number(`${item.timestamp.slice(0, 8)}0000`));
      const startOfWeek = new Date(date);
      startOfWeek.setDate(date.getDate() - date.getDay()); // Sunday

      const label = startOfWeek.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      });

      const currentViews = weeklyMap.get(label) || 0;
      weeklyMap.set(label, currentViews + item.views);
    });

    return {
      labels: [...weeklyMap.keys()],
      views: [...weeklyMap.values()],
    };
  }

  // For daily and monthly, no change
  const labels: string[] = [];
  const views: number[] = [];

  data.forEach((item) => {
    labels.push(formatTimestamp(item.timestamp, granularity));
    views.push(item.views);
  });

  return {
    labels,
    views,
  };
};
