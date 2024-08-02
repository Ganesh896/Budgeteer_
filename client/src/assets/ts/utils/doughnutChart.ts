import Chart from "chart.js/auto";

export const renderDoughnutChart = () => {
    // categories chart
    const categoryChartEle = document.getElementById("categories__chart") as HTMLCanvasElement;
    // const categoryItemsEle = document.querySelector(".categories") as HTMLUListElement;

    (async function () {
        interface CategoryData {
            category: string;
            amount: number;
        }

        const data: CategoryData[] = [
            { category: "Cafe & Restaurants", amount: 10 },
            { category: "Entertainment", amount: 20 },
            { category: "Investments", amount: 15 },
            { category: "Foods & Groceries", amount: 25 },
            { category: "Health & Beauty", amount: 22 },
            { category: "Travelling", amount: 30 },
        ];

        new Chart(categoryChartEle, {
            type: "doughnut",

            data: {
                labels: data.map((category) => category.category),
                datasets: [
                    {
                        label: "My First Dataset",
                        data: data.map((amount) => amount.amount),
                        backgroundColor: ["#8370fe", "#bfb7ff", "#f6f4ff", "#46454b", "#82828c"],
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

        // data.forEach((item) => {
        //     const li = document.createElement("li");
        //     li.innerHTML = `<i class="bx bxs-circle"></i><span>${item.category}</span>`;
        //     categoryItemsEle.appendChild(li);
        // });
    })();
};
