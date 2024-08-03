import Chart from "chart.js/auto";

import { getExpenseByCategores } from "../expenses/axios";
import { CategoryData } from "../interface/categories";

// Function to generate a list of colors
const generateColors = (count: number): string[] => {
    const colors = ["#8370fe", "#bfb7ff", "#f6f4ff", "#46454b", "#82828c"];
    const colorGenerator = (index: number) => {
        const hue = (index * 360) / count;
        return `hsl(${hue}, 70%, 70%)`;
    };
    for (let i = 0; i < count; i++) {
        colors.push(colorGenerator(i));
    }
    return colors;
};

export const renderDoughnutChart = async () => {
    // categories chart
    const categoryChartEle = document.getElementById("categories__chart") as HTMLCanvasElement;
    // const categoryItemsEle = document.querySelector(".categories") as HTMLUListElement;

    const data: CategoryData[] = await getExpenseByCategores();

    const colors = generateColors(data.length);

    (async function () {
        new Chart(categoryChartEle, {
            type: "doughnut",

            data: {
                labels: data.map((category) => category.category),
                datasets: [
                    {
                        label: "My First Dataset",
                        data: data.map((amount) => amount.amount),
                        backgroundColor: colors,
                        hoverOffset: 4,
                    },
                ],
            },
            options: {
                responsive: true,
                plugins: {
                    legend: {
                        position: "bottom",
                    },
                },
            },
        });
    })();
};
