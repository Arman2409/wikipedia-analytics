import { periodsMap } from '../../controllers/utils/data';
import logger from '../../services/logger';
import type { ChartData, PageViewsItem, PageViewsResponse, Period } from '../../types/views';

const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

export const transformPageViews = (
  data: PageViewsItem[],
  period: number
): PageViewsResponse => {
  const granularity = periodsMap.get(period as Period);

  // Check if excessive data was received 
  if (data.length % 2 !== 0) {
    data.shift();
  }

  // Cut into two parts for previous and current data 
  const previousData = data.splice(0, data.length / 2);

  if (!granularity) {
    logger.error("Period not allowed. Allowed periods are: ", Array.from(periodsMap.keys()).join(", "));
    return {} as PageViewsResponse;
  }

  const current = getLabelsAndViews(data, granularity);
  const previous = getLabelsAndViews(previousData, granularity);

  return {
    current,
    previous: {
      views: previous.views,
    },
  };
};

function getLabelsAndViews(
  data: PageViewsItem[],
  granularity: string
): ChartData {
  const labels: string[] = [];
  const views: number[] = [];

  if (granularity === "weekly") {
    while (data.length > 0) {
      const currArr = data.splice(0, 7);

      if (currArr[0]?.timestamp && currArr[currArr.length - 1]?.timestamp) {
        const weekStart = formatTimestamp(currArr[0]?.timestamp, "daily");
        const weekEnd = formatTimestamp(currArr[currArr.length - 1]?.timestamp as string, "daily");

        const timeStamp = `${weekStart} - ${weekEnd}`;
        let sum = 0;

        data.forEach(({ views }) => sum += views);

        labels.push(timeStamp);
        views.push(sum);
      }
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
    const month = parseInt(timestamp.slice(4, 6), 10);

    const formattedDate = `${day} ${monthNames[month - 1]}`;

    return formattedDate;
  } else if (granularity === 'monthly') {

    const month = parseInt(timestamp.slice(4, 6), 10);

    return monthNames[month - 1] + " " + timestamp.slice(0, 4);
  }

  return "";
}
