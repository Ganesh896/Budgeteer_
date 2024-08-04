import Chart from "chart.js/auto";

export const renderBarChart = () => {
    // money flow chart
    const moneyFlowChartEle = document.getElementById("money__flow") as HTMLCanvasElement;

    (async function () {
        interface MonthData {
            month: string;
            amount: number;
        }

        const data: MonthData[] = [
            { month: "Jan", amount: 10 },
            { month: "Feb", amount: 20 },
            { month: "March", amount: 15 },
            { month: "April", amount: 25 },
            { month: "May", amount: 22 },
            { month: "June", amount: 30 },
        ];

        new Chart(moneyFlowChartEle, {
            type: "bar",
            data: {
                labels: data.map((row) => row.month),
                datasets: [
                    {
                        label: "Income",
                        backgroundColor: "#8370fe",
                        barThickness: 15,
                        borderRadius: 30,
                        data: data.map((row) => row.amount),
                    },
                    {
                        label: "Expenses",
                        backgroundColor: "#bfb7ff",
                        barThickness: 15,
                        borderRadius: 30,
                        data: data.map((row) => row.amount - 5),
                    },
                ],
            },
        });
    })();
};
