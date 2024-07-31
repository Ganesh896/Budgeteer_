import { Expense } from "../interface/expense";

export async function paginate(fetchData: (page: number, size: number) => Promise<any>, renderData: (data: any) => void, size: number) {
    const prevButton = document.querySelector(".expenses__prev--btn") as HTMLButtonElement;
    const nextButton = document.querySelector(".expenses__next--btn") as HTMLButtonElement;
    const currentPageEle = document.querySelector(".current__page") as HTMLSpanElement;
    const totalPageEle = document.querySelector(".total__pages") as HTMLSpanElement;
    let page = 1;
    let sorted = false; // Flag to check if sorting is applied

    async function updatePageButtons(totalPages: number) {
        if (totalPages === 0 || page <= 1) {
            prevButton.setAttribute("disabled", "true");
        } else {
            prevButton.removeAttribute("disabled");
        }

        if (totalPages === 0 || page >= totalPages) {
            nextButton.setAttribute("disabled", "true");
        } else {
            nextButton.removeAttribute("disabled");
        }
    }

    async function loadPageData(page: number, size: number) {
        const response = await fetchData(page, size);
        let data = response.data;

        if (sorted) {
            data = data.sort((a: Expense, b: Expense) => b.amount - a.amount);
        }

        renderData(data); // Call the passed render function
        return response.meta.total.count;
    }

    async function initPagination() {
        const total = await loadPageData(page, size);
        const totalPages = Math.ceil(total / size);

        totalPageEle.innerText = totalPages + "";
        currentPageEle.innerText = totalPages === 0 ? "0" : page + "";

        updatePageButtons(totalPages);
    }

    prevButton.addEventListener("click", async function () {
        if (page > 1) {
            page--;
            const total = await loadPageData(page, size);
            const totalPages = Math.ceil(total / size);
            currentPageEle.innerText = page + "";
            updatePageButtons(totalPages);
        }
    });

    nextButton.addEventListener("click", async function () {
        const total = await loadPageData(page, size);
        const totalPages = Math.ceil(total / size);
        if (page < totalPages) {
            page++;
            await loadPageData(page, size);
            currentPageEle.innerText = page + "";
            updatePageButtons(totalPages);
        }
    });

    // Sorting data by amount
    const sortBtn = document.querySelector(".expenses__sort--btn") as HTMLButtonElement;
    sortBtn?.addEventListener("click", async function () {
        sorted = !sorted; // Toggle sorting flag
        await loadPageData(page, size); // Reload data with sorting
    });

    initPagination();
}
