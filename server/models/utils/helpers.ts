import { periodsMap } from '../../controllers/utils/data';
import logger from '../../services/logger';
import type { ChartData, PageViewsItem, PageViewsResponse, Period } from '../../types/getViews';


export const transformPageViews = (
  data: PageViewsItem[],
  period: number
): PageViewsResponse => {
  
  const previousData = data.splice(0, period);

  const granularity = periodsMap.get(period as Period);

  if (!granularity) {
    logger.error("Period not allowed. Allowed periods are: ", Array.from(periodsMap.keys()).join(", "));
    return {} as PageViewsResponse;
  }

  const current = getLabelsAndViews(data, granularity);
  const previous = getLabelsAndViews(previousData, granularity);

  return {
    current,
    previous,
  };
};

function getLabelsAndViews(
  data: PageViewsItem[], 
  granularity: string
): ChartData {
  const labels: string[] = [];
  const views: number[] = [];

  if(granularity === "weekly") {
    while(data.length > 0) {
      const currArr = data.splice(0, 6);

      const weekStart = formatTimestamp(currArr[0]?.timestamp, "daily");
      const weekEnd = formatTimestamp(currArr[currArr.length - 1]?.timestamp, "daily");

      const timeStamp = `${weekStart} - ${weekEnd}`;
      let sum = 0;

      data.forEach(({ views }) => sum += views);

      labels.push(timeStamp);
      views.push(sum);
      
    }
  } else {
    data.forEach((item) => {
      labels.push(formatTimestamp(item.timestamp, granularity));
      views.push(item.views);
    });
  }

  return {
    labels,
    views,
  }
}

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

  return "";
}
