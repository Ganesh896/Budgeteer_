import { Expense } from "../interface/expense";
import { GetQuery } from "../interface/query";
import { BaseModel } from "./base";

export class ExpenseModel extends BaseModel {
    // add expense
    static addExpense(userId: string, expense: Expense) {
        const id = crypto.randomUUID();
        const newExpense = {
            id,
            userId,
            ...expense,
        };
        return this.queryBuilder().insert(newExpense).table("expenses");
    }

    // update expense
    static updateExpense(id: string, expense: Expense) {
        const { title, description, categoryId, paymentMethod, amount } = expense;
        const expenseToUpdate = {
            title,
            description,
            categoryId,
            paymentMethod,
            amount,
        };

        return this.queryBuilder().update(expenseToUpdate).table("expenses").where({ id });
    }

    // get expenses
    static async getExpenses(userId: string, filter: GetQuery) {
        const { q } = filter;

        const query = await this.queryBuilder()
            .select("e.createdAt", "title", "description", "paymentMethod", "amount", "c.categoryName")
            .from("expenses as e")
            .join("categories as c", "c.id", "e.category_id")
            .limit(filter.size!)
            .offset((filter.page! - 1) * filter.size!)
            .where("e.userId", userId);

        // if (q) {
        //     query;
        // }

        return query;
    }

    // expense count
    static async count(userId: string, filter: GetQuery) {
        const { q } = filter;

        const query = await this.queryBuilder().count("*").table("expenses").where({ userId }).limit(filter.size!).first();

        // if (q) {
        //     query.where({ userId });
        // }

        return query;
    }

    // update expense
    static deleteExpense(id: string) {
        return this.queryBuilder().delete().table("expenses").where({ id });
    }

    // get expense category
    static async getCategory(userId: string) {
        return this.queryBuilder().select("id", "categoryName").from("categories").where({ userId }).orWhereNull("userId");
    }

    // get expense category
    static async addCategory(userId: string, id: number, categoryName: string) {
        return this.queryBuilder().insert({ id, userId, categoryName }).table("categories");
    }
}
