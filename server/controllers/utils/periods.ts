import type { Granularity } from "../../types/getViews";

export const periodsMap =  new Map<number, Granularity>([
    [30, 'daily'],
    [90, 'weekly'],
    [365, 'monthly']
]);