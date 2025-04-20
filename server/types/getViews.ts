export type Granularity = "daily" | "monthly" | "weekly"

export interface GetPageViewsPayload {
    period: number;
    name: string;
    granularity: Granularity;
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