export interface GetPageViewsPayload {
    period: number;
    name: string;
    granularity: string;
}

export interface PageViewsItem {
    views: number;
    timestamp: string;
}

export interface PageViewsRetrievedData {
    items: PageViewsItem[];
}

export interface PageViewsResponse {
    labels: string[];
    views: number[];
}