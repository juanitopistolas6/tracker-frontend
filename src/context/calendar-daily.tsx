import { useAxios } from '@/hooks/useAxios'
import { IResponse, IExpense } from '@/util/interfaces'
import {
  QueryObserverResult,
  RefetchOptions,
  useQuery,
} from '@tanstack/react-query'
import { createContext, useContext } from 'react'
import { useParams } from 'react-router-dom'

interface CalendarDailyContext {
  expenses: IResponse<IExpense[]> | undefined
  refetchCalendar: (
    options?: RefetchOptions
  ) => Promise<QueryObserverResult<IResponse<IExpense[]>, Error>>
}

const CalendarDailyContext = createContext<CalendarDailyContext | null>(null)

export const CalendarDailyProvider = ({
  children,
}: {
  children: React.ReactNode
}) => {
  const { axios } = useAxios()
  const { date } = useParams()

  const { data: expenses, refetch: refetchCalendar } = useQuery({
    enabled: !!date,
    queryKey: ['expense-day'],
    queryFn: async () => {
      const response = await axios.get<IResponse<IExpense[]>>(`/expense/date`, {
        params: { date },
      })

      console.log(response.data)

      return response.data
    },
    staleTime: 0,
  })

  console.log(expenses)

  const values = {
    expenses,
    refetchCalendar,
  }

  return (
    <CalendarDailyContext.Provider value={values}>
      {children}
    </CalendarDailyContext.Provider>
  )
}

export const useCalendarDaily = () => {
  const context = useContext(CalendarDailyContext)

  if (!context) {
    throw new Error('useCalendarDaily must be used wihtin its reach')
  }

  return context
}
