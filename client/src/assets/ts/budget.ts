import axios from "axios";
import { baseUrl } from "../../main";

document.addEventListener("DOMContentLoaded", () => {
    const budgetAmountInputEle = document.getElementById("budget__amount") as HTMLInputElement;
    const setBudgetAmountBtnEle = document.getElementById("set__budget--btn") as HTMLButtonElement;

    setBudgetAmountBtnEle.addEventListener("click", async () => {
        axios.post(`${baseUrl}budget`)
    })
})