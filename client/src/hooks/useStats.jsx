import { useState } from "react";
import { useDispatch } from "react-redux";
import {
  getBarChartDataApi,
  getLatestBudgetsApi,
  getLatestExpensesApi,
  getOverviewApi,
} from "../api/stats.api";
import { setError } from "../redux/slices/error.slice";

export default function useStats() {
  const [totalBudget, setTotalBudget] = useState(false);
  const [totalSpend, setTotalSpend] = useState(false);
  const [numOfBudgets, setNumOfBudgets] = useState(false);
  const [barChartData, setBarChartData] = useState(false);
  const [latestBudgets, setLatestBudgets] = useState(false);
  const [latestExpenses, setLatestExpenses] = useState(false);
  const dispatch = useDispatch();

  const getOverview = async () => {
    const res = await getOverviewApi();
    if (!res.success) {
      dispatch(setError(res.message));
    } else {
      setTotalBudget(res.netBudgetAmount);
      setTotalSpend(res.netSpendingAmount);
      setNumOfBudgets(res.netBudgets);
    }
  };

  const getBarChartData = async () => {
    const res = await getBarChartDataApi();
    if (!res.success) {
      dispatch(setError(res.message));
    } else {
      setBarChartData({
        names: res.budgetNames,
        spentAmounts: res.spentAmounts,
        remainingAmounts: res.remainingAmounts,
      });
    }
  };

  const getLatestBudgets = async () => {
    const res = await getLatestBudgetsApi();
    if (!res.success) {
      dispatch(res.message);
    } else {
      setLatestBudgets(res.budgets);
    }
  };

  const getLatestExpenses = async () => {
    const res = await getLatestExpensesApi();
    if (!res.success) {
      dispatch(res.message);
    } else {
      setLatestExpenses(res.last3Expenses);
    }
  };

  return {
    totalBudget,
    totalSpend,
    numOfBudgets,
    barChartData,
    latestBudgets,
    latestExpenses,
    setLatestExpenses,
    getOverview,
    getBarChartData,
    getLatestBudgets,
    getLatestExpenses,
  };
}