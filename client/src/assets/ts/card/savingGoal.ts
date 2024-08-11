export const SavingGoal = (goalName: string, goalAmount: number, currentAmount: number) => {
    const savingPercent = Math.round((currentAmount / goalAmount) * 100);

    return `
        <div class="saving__items--title">
            <p>${goalName}</p>
            <p>Rs <span id="currentSavingAmount">${currentAmount}</span></p>
            <p>Rs <span id="savingGoalAmount">${goalAmount}</span></p>
        </div>
        <div class="progress">
            <div class="progress__bar">
                <div class="progress__bar--inner" style="width: ${savingPercent}%;">
                    <span>${savingPercent > 0 ? savingPercent + "%" : ""}</span>
                </div>
            </div>
        </div>`;
};
