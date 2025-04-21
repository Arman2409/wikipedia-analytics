import Chart from 'chart.js/auto';

import { getCssVariable } from '../utils/helpers';
import { AVAILABLE_COLORS_FOR_CHART } from '../configs/constants';

const colors: string[] = [];

AVAILABLE_COLORS_FOR_CHART.forEach(color => {
    colors.push(getCssVariable(`--color-${color}`))
})

const borderColors = [...colors];
borderColors.push(...borderColors.splice(0, 1));

const canvasElement = document.getElementById('myChart') as HTMLCanvasElement;

const myChart = new Chart(canvasElement, {
    type: 'bar',
    data: {
        labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
        datasets: [{
            label: 'Page Analytics',
            data: [1, 2, 3, 4, 5],
            backgroundColor: colors,
            borderColor: borderColors,
            borderWidth: 2
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true
            }
        }
    }
});

export const updateChart = (
    labels: string[],
    views: number[]
) => {
    myChart.data.labels = labels;
    myChart.data.datasets[0].data = views;
    myChart.update();
}