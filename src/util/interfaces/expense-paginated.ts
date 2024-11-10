import { IExpense } from './expense'

export interface IExpensePaginated {
  expenses: IExpense[]
  page: number
  limit: number
  totalPages: number
}
