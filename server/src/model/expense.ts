import { Expense } from "../interface/expense";
import { GetQuery } from "../interface/query";
import { BaseModel } from "./base";

export class ExpenseModel extends BaseModel {
    // add expense
    static async addExpense(userId: string, expense: Expense) {
        if (expense.categoryName) {
            await this.queryBuilder().insert({ id: expense.categoryId, userId, categoryName: expense.categoryName }).table("categories");
        }
        delete expense.categoryName; // remove categoryName while adding in expense instead storing catId
        const id = crypto.randomUUID();
        const newExpense = {
            id,
            userId,
            ...expense,
        };
        const response = await this.queryBuilder().insert(newExpense).table("expenses");
        return response;
    }

    // update expense
    static updateExpense(id: string, expense: Expense) {
        const { title, categoryId, paymentMethod, amount, groupId } = expense;
        const expenseToUpdate = {
            title,
            categoryId,
            paymentMethod,
            amount,
            groupId,
        };

        if (!groupId) {
            delete expenseToUpdate.groupId;
        }

        return this.queryBuilder().update(expenseToUpdate).table("expenses").where({ id });
    }

    // get expenses
    static async getExpenses(userId: string, filter: GetQuery) {
        const { q } = filter;

        const query = this.queryBuilder()
            .select("e.id", "e.createdAt", "title", "paymentMethod", "amount", "c.categoryName")
            .from("expenses as e")
            .join("categories as c", "c.id", "e.category_id")
            .limit(filter.size!)
            .offset((filter.page! - 1) * filter.size!)
            .where("e.userId", userId)
            .andWhere(function () {
                this.whereNull("e.groupId");
            });

        if (q) {
            query.whereLike("title", `%${q}%`);
        }

        return query;
    }

    // expense count
    static async count(userId: string, filter: GetQuery) {
        const { q } = filter;

        const query = this.queryBuilder()
            .count("*")
            .table("expenses")
            .where({ userId })
            .andWhere(function () {
                this.whereNull("groupId");
            })
            .limit(filter.size!)
            .first();

        if (q) {
            query.whereLike("title", `%${q}%`);
        }

        return query;
    }

    // get expenses by id
    static getExpenseById(userId: string, id: string) {
        return this.queryBuilder().select("*").from("expenses").where({ id }).andWhere({ userId }).first();
    }

    // update expense
    static deleteExpense(id: string) {
        return this.queryBuilder().delete().table("expenses").where({ id });
    }

    // get expense category
    static async getCategory(userId: string) {
        return this.queryBuilder().select("id", "categoryName").from("categories").where({ userId }).orWhereNull("userId");
    }
}
