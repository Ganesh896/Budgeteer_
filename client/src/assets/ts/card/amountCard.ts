export const AmountCard = (title: string, amount: number, percentageDiff: number) => {
    return `
        <div class="amount__card--title">
            <h3 class="small__title">${title}</h3>
        </div>
        <div class="amount__card--body">
            <h2 class="subtitle">$ <span>Rs ${amount}</span></h2>
        </div>
        `;
};
