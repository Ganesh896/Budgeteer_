export const SavingGoal = (goalName: string, goalAmount: number, currentAmount: number) => {
    const savingPercent = Math.round((currentAmount / goalAmount) * 100);

    return `
        <div class="saving__items--title">
            <p>${goalName}</p>
            <p>Rs ${currentAmount}</p>
            <p>Rs <span>${goalAmount}</span></p>
        </div>
        <div class="progress">
            <div class="progress__bar">
                <div class="progress__bar--inner" style="width: ${savingPercent}%;">
                    <span>${savingPercent > 0 ? savingPercent + "%" : ""}</span>
                </div>
            </div>
        </div>`;
};
