import type { Period, Granularity } from "../../types/views";


export const periodsMap =  new Map<Period, Granularity>([
    [30, 'daily'],
    [90, 'weekly'],
    [365, 'monthly']
]);