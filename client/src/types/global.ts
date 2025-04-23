export interface PageViewsResponse {
    current: ChartData;
    previous: ChartData;
}

interface ChartData {
    labels: string[];
    views: number[];
}