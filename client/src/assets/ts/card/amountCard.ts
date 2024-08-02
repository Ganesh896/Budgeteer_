export const AmountCard = (title: string, amount: number, percentageDiff: number) => {
    return `
        <div class="amount__card--title">
            <h3 class="small__title">${title}</h3>
        </div>
        <div class="amount__card--body">
            <h2 class="subtitle">$ <span>Rs ${amount}</span></h2>
            <div class="comparision">
                <div class="difference ${(title === "Expense" || (title === "Remaining" && amount < 0)) && "expense"}">
                    <i class="bx bx-up-arrow-alt"></i>
                    <span>${percentageDiff}%</span>
                </div>
                <p class="meta__text">vs last month</p>
            </div>
        </div>
        `;
};
