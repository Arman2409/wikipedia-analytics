import type { Period, Granularity } from "../../types/getViews";


export const periodsMap =  new Map<Period, Granularity>([
    [30, 'daily'],
    [90, 'weekly'],
    [365, 'monthly']
]);
