export const AmountCard = (amount: number) => {
    return `
        <h2 class="subtitle">$ <span>Rs. ${amount}</span></h2>
        <div class="comparision">
            <div class="difference">
                <i class="bx bx-up-arrow-alt"></i>
                <span>12.1%</span>
            </div>
            <p class="meta__text">vs last month</p>
        </div>`;
};
