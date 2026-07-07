import type { Request, Response } from 'express';
import * as ExpenseModel from '../models/expenseModel.js';
import * as ExpenseAccountModel from '../models/expenseAccountModel.js';
import * as PaymentAccountModel from '../models/paymentAccountModel.js';

// TODO: replace with your real auth-derived company_id (e.g. req.user.company_id)
const getCompanyId = (req: Request) => {
  const user = (req as any).user;
  const fromUser = user?.company_id;
  const fromQuery = req.query?.company_id;
  const fromBody = req.body?.company_id;
  return Number(fromUser || fromQuery || fromBody || 1);
};

export const listExpenses = async (req: Request, res: Response) => {
  try {
    const data = await ExpenseModel.getAllExpenses(getCompanyId(req));
    res.json({ success: true, data });
  } catch (err: any) {
    console.error('❌ Expense API error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const getExpense = async (req: Request, res: Response) => {
  try {
    const data = await ExpenseModel.getExpenseById(getCompanyId(req), Number(req.params.id));
    if (!data) return res.status(404).json({ success: false, message: 'Expense not found' });
    res.json({ success: true, data });
  } catch (err: any) {
    console.error('❌ Expense API error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const addExpense = async (req: Request, res: Response) => {
  try {
    const id = await ExpenseModel.createExpense(getCompanyId(req), req.body);
    res.json({ success: true, data: { id } });
  } catch (err: any) {
    console.error('❌ Expense API error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const editExpense = async (req: Request, res: Response) => {
  try {
    await ExpenseModel.updateExpense(getCompanyId(req), Number(req.params.id), req.body);
    res.json({ success: true });
  } catch (err: any) {
    console.error('❌ Expense API error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const editExpenseStatus = async (req: Request, res: Response) => {
  try {
    await ExpenseModel.updateExpenseStatus(getCompanyId(req), Number(req.params.id), req.body.status);
    res.json({ success: true });
  } catch (err: any) {
    console.error('❌ Expense API error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const removeExpense = async (req: Request, res: Response) => {
  try {
    await ExpenseModel.deleteExpense(getCompanyId(req), Number(req.params.id));
    res.json({ success: true });
  } catch (err: any) {
    console.error('❌ Expense API error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const listExpenseAccounts = async (req: Request, res: Response) => {
  try {
    const data = await ExpenseAccountModel.getAllExpenseAccounts(getCompanyId(req));
    res.json({ success: true, data });
  } catch (err: any) {
    console.error('❌ Expense API error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const addExpenseAccount = async (req: Request, res: Response) => {
  try {
    const id = await ExpenseAccountModel.createExpenseAccount(getCompanyId(req), req.body.name, req.body.description);
    res.json({ success: true, data: { id } });
  } catch (err: any) {
    console.error('❌ Expense API error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const listPaymentAccounts = async (req: Request, res: Response) => {
  try {
    const data = await PaymentAccountModel.getAllPaymentAccounts(getCompanyId(req));
    res.json({ success: true, data });
  } catch (err: any) {
    console.error('❌ Expense API error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};

export const addPaymentAccount = async (req: Request, res: Response) => {
  try {
    const id = await PaymentAccountModel.createPaymentAccount(getCompanyId(req), req.body.name, req.body.account_type);
    res.json({ success: true, data: { id } });
  } catch (err: any) {
    console.error('❌ Expense API error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};
export const editExpenseBillable = async (req: Request, res: Response) => {
  try {
    await ExpenseModel.updateExpenseBillable(getCompanyId(req), Number(req.params.id), !!req.body.is_billable);
    res.json({ success: true });
  } catch (err: any) {
    console.error('❌ Expense API error:', err);
    res.status(500).json({ success: false, message: err.message });
  }
};