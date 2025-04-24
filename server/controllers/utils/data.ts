import type { Period, Granularity } from "../../types/views";


export const periodsMap =  new Map<Period, Granularity>([
    [30, 'daily'],
    [90, 'weekly'],
    [365, 'monthly']
]);

export const granularityDays = new Map<Granularity, number>([ 
   ["daily", 1],
   ["weekly", 7],
   ["monthly", 30],
]);