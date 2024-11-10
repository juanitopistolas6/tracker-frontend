import { IExpense } from '../util/interfaces'

export interface IExpenseState {
  expenses: IExpense[] | null
  error: boolean
}

export type expensePayload =
  | { action: 'ADD_EXPENSE'; payload: IExpense }
  | { action: 'REMOVE_EXPENSE'; payload: IExpense }
  | { action: 'GET_EXPENSES'; payload: IExpense[] }
  | { action: 'FETCH_ERROR' }

export function expenseReducer(
  state: IExpenseState,
  action: expensePayload
): IExpenseState {
  const { action: actionPaylaod } = action

  switch (actionPaylaod) {
    case 'ADD_EXPENSE': {
      return manageExpense('ADD', state, action.payload)
    }
    case 'REMOVE_EXPENSE': {
      return manageExpense('REMOVE', state, action.payload)
    }
    case 'GET_EXPENSES': {
      return state.expenses
        ? {
            expenses: [...state.expenses, ...action.payload],
            error: false,
          }
        : { expenses: action.payload, error: false }
    }
    case 'FETCH_ERROR': {
      return { ...state, error: true }
    }
    default: {
      return state
    }
  }
}

function manageExpense(
  action: 'ADD' | 'REMOVE',
  state: IExpenseState,
  payload: IExpense
): IExpenseState {
  if (!state.expenses) return { ...state, error: true }

  if (action == 'ADD') {
    return { expenses: [...state.expenses, { ...payload }], error: false }
  } else {
    const itemFound = state.expenses.find((item) => item.id === payload.id)

    return itemFound
      ? {
          expenses: [
            ...state.expenses.filter((item) => item.id == itemFound.id),
          ],
          error: false,
        }
      : { ...state, error: true }
  }
}
