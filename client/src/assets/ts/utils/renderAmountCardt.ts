import { AmountCard } from "../card/amountCard";

export const renderAmountCard = async (amountCardContainer: HTMLDivElement, title: string, amount: number, percentageDiff: number) => {
    // render budget
    amountCardContainer.innerHTML = AmountCard(title, amount, percentageDiff);
};
