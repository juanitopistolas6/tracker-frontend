import { useInfiniteQuery, useMutation } from '@tanstack/react-query'
import {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useReducer,
} from 'react'
import { useAxios } from '../hooks/useAxios'
import { ICreateExpense, IExpense, IResponse } from '../util/interfaces'
import { IExpensePaginated } from '../util/interfaces/expense-paginated'
import { expenseReducer, IExpenseState } from '../hooks/expense-reducer'
import { useAuth } from './auth-context'

interface IExpenseValues {
  state: IExpenseState
}

const expenseContext = createContext<IExpenseValues | null>(null)

export function ExpenseProvider({ children }: { children: ReactNode }) {
  const { axios } = useAxios()
  const { isAuthenticated } = useAuth()
  const [state, dispatch] = useReducer(expenseReducer, {
    expenses: [],
    error: false,
  })

  const { data, hasNextPage, fetchNextPage } = useInfiniteQuery({
    enabled: isAuthenticated,
    queryKey: ['expenses'],
    initialPageParam: 1,
    queryFn: async ({ pageParam = 1 }) => {
      const response = await axios.get<IResponse<IExpensePaginated>>(
        `/expense?page=${pageParam}`
      )

      return response.data
    },
    getNextPageParam: (lastPage) => {
      const { data } = lastPage

      return data.page < data.totalPages ? data.page + 1 : undefined
    },
  })

  const { mutate: createExpense } = useMutation({
    mutationFn: async (expense: ICreateExpense) => {
      const response = await axios.post<IResponse<IExpense>>(
        '/expense',
        expense
      )

      return response.data
    },
    onSuccess: (data) => {
      const { status, data: expense } = data

      if (status !== 200) return

      dispatch({ action: 'ADD_EXPENSE', payload: expense })
    },
    onError: () => {
      dispatch({ action: 'FETCH_ERROR' })
    },
  })

  useEffect(() => {
    if (!data) return

    const lastPage = data?.pages.length - 1

    dispatch({
      action: 'GET_EXPENSES',
      payload: data.pages[lastPage].data.expenses,
    })
  }, [data])

  console.log(state)

  const values: IExpenseValues = {
    state,
  }

  return (
    <expenseContext.Provider value={values}>{children}</expenseContext.Provider>
  )
}

export function useExpense() {
  const context = useContext(expenseContext)

  if (!context) throw new Error('Expense context must be within its reach')

  return context
}
