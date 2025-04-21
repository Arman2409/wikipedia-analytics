export type Period = 30 | 90 | 365;
export type Granularity = "daily" | "monthly" | "weekly"

export interface GetPageViewsDto {
    name: string;
    period: Period;
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