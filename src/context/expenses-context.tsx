import {
  FetchNextPageOptions,
  InfiniteData,
  InfiniteQueryObserverResult,
  QueryObserverResult,
  RefetchOptions,
  useInfiniteQuery,
  UseMutateFunction,
  useMutation,
  useQuery,
} from '@tanstack/react-query'
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
  expenseDate: IResponse<IExpense[]> | undefined
  hasNextPage: boolean
  expensesInterval: IResponse<IExpense[]> | undefined
  fetchNextPage: (
    options?: FetchNextPageOptions
  ) => Promise<
    InfiniteQueryObserverResult<
      InfiniteData<IResponse<IExpensePaginated>, unknown>,
      Error
    >
  >
  createExpense: UseMutateFunction<
    IResponse<IExpense>,
    Error,
    ICreateExpense,
    unknown
  >
  getExpenseByDate: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<IResponse<IExpense[]>, Error>>
  getExpensesInterval: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<any, Error>>
  editExpense: UseMutateFunction<
    IResponse<IExpense>,
    Error,
    {
      expense: ICreateExpense
      id: string
    },
    unknown
  >
  deleteExpense: UseMutateFunction<IResponse<IExpense>, Error, string, unknown>
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

  const { data: expenseDate, refetch: getExpenseByDate } = useQuery({
    enabled: false,
    queryKey: ['expense-date'],
    queryFn: async ({ queryKey }) => {
      const [_, date] = queryKey

      const response = await axios.get<IResponse<IExpense[]>>(
        `/expense/date?date=${date}`
      )

      return response.data
    },
  })

  const { data: expensesInterval, refetch: getExpensesInterval } = useQuery({
    enabled: false,
    queryKey: ['expense-interval'],
    queryFn: async ({ queryKey }) => {
      const [_, startDate, endDate] = queryKey

      const response = await axios.get<IResponse<IExpense[]>>(
        `/expense/interval?startDate${startDate}&endDate=${endDate}`
      )

      return response.data
    },
  })

  const { mutate: createExpense } = useMutation({
    mutationFn: async (expense: ICreateExpense) => {
      const response = await axios.post<IResponse<IExpense>>(
        '/expense',
        expense
      )

      console.log(response)

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

  const { mutate: editExpense } = useMutation({
    mutationFn: async ({
      expense,
      id,
    }: {
      expense: ICreateExpense
      id: string
    }) => {
      const response = await axios.put<IResponse<IExpense>>(
        `/expense/${id}`,
        expense
      )

      return response.data
    },
    onSuccess: (data) => {
      const { data: expense, status } = data

      if (status !== 200) return

      dispatch({ action: 'REPLACE_EXPENSE', payload: expense })
    },
    onError: () => {
      dispatch({ action: 'FETCH_ERROR' })
    },
  })

  const { mutate: deleteExpense } = useMutation({
    mutationFn: async (id: string) => {
      const response = await axios.delete<IResponse<IExpense>>(`/expense/${id}`)

      return response.data
    },
    onSuccess: (data) => {
      const { data: expense, status } = data

      if (status !== 200) return

      dispatch({ action: 'REMOVE_EXPENSE', payload: expense })
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

  const values: IExpenseValues = {
    state,
    hasNextPage,
    expenseDate,
    expensesInterval,
    editExpense,
    getExpensesInterval,
    getExpenseByDate,
    createExpense,
    fetchNextPage,
    deleteExpense,
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
