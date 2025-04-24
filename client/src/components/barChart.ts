import Chart from 'chart.js/auto';

import { CHART_BORDER_WIDTH, CHART_COLORS } from '../constants/constants';
import { getCssVariable } from '../utils/helpers';
import type { PageViewsResponse } from '../types/global';
import type { ChartColors } from '../types/barChart';


const chartColors: ChartColors = {} as ChartColors;

// Get Chart colors from the UI 
CHART_COLORS.forEach((cssKey, chartKey) => {
    chartColors[chartKey] = getCssVariable(`--color-${cssKey}`);
});

const canvasElement = document.getElementById('bar-chart') as HTMLCanvasElement;

const barChart = new Chart(canvasElement, {
    type: 'bar',
    data: {
        labels: [],
        datasets: [{
            label: 'Previous page views',
            data: [],
            backgroundColor: chartColors.previousBar,
            borderColor: chartColors.border,
            borderWidth: CHART_BORDER_WIDTH
        },
        {
            label: 'Current page views',
            data: [],
            backgroundColor: chartColors.currentBar,
            borderColor: chartColors.border,
            borderWidth: CHART_BORDER_WIDTH
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
}) as Chart<"bar">;

// Update the chart externally 
export const updateChart = (
    {
        current,
        previous
    }: PageViewsResponse
) => {
    const { labels, views } = { ...current };
    const { views: prevViews } = { ...previous };

    barChart.data.labels = labels;

    if (barChart.data.datasets[0]) {
        barChart.data.datasets[0].data = prevViews;
    }
    if (barChart.data.datasets[1]) {
        barChart.data.datasets[1].data = views;
    }

    barChart.update();
}