import { periodsMap } from '../../controllers/utils/periods';
import type { PageViewsItem, PageViewsResponse, Period } from '../../types/getViews';


export const transformPageViews = (
  data: PageViewsItem[],
  period: number
): PageViewsResponse => {
  
  const granularity = periodsMap.get(period as Period);

  if (!granularity) {
    throw new Error(`Invalid period: ${period}`);
  }

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


function formatTimestamp(
  timestamp: string,
  granularity: string
): string {
  
  if (granularity === 'daily') {

    const day = parseInt(timestamp.slice(6, 8), 10);
    
    return String(day);
    

  } else if (granularity === 'weekly') {

    const day = parseInt(timestamp.slice(6, 8), 10);

    return String(day);
  } else if (granularity === 'monthly') {

    const month = parseInt(timestamp.slice(4, 6), 10) - 1;

    return String(month);
  }

  throw new Error(`Unsupported granularity: ${granularity}`);
}

