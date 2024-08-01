export interface Expense {
    id:string;
    title: string;
    description: string;
    paymentMethod: string;
    amount: number;
    categoryId: number;
    createdAt: string;
    categoryName: string;
    profile: string;
}
