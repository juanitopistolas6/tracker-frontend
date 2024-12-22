import { useEffect, useMemo, useState } from 'react'
import { HeroIcons } from '../util/hero-icons'
import { CalendarSquare } from '../components/calendar-square'
import { NullSquare } from '../components/null-square'
import { useQuery } from '@tanstack/react-query'
import { useAxios } from '@/hooks/useAxios'
import { IExpense, IResponse } from '@/util/interfaces'
import formatDateToMonthYear from '@/util/formateMonth'

export const Calendar = () => {
  const { axios } = useAxios()
  const [currentDate, setCurrentDate] = useState(new Date())

  const { data: expensesInterval, refetch } = useQuery({
    enabled: !!currentDate,
    queryKey: ['interval-expenses'],
    queryFn: async () => {
      const startDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth(),
        1
      ).toISOString()

      const endDate = new Date(
        currentDate.getFullYear(),
        currentDate.getMonth() + 1,
        0
      ).toISOString()

      const { data } = await axios.get<IResponse<IExpense[]>>(
        '/expense/interval',
        {
          params: { startDate, endDate },
        }
      )

      return data
    },
  })

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1, 1)
    )
  }

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 1)
    )
  }

  const days = useMemo(() => {
    const days = []
    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const firstDay = new Date(year, month, 1).getDay()
    const lastDate = new Date(year, month + 1, 0).getDate()
    const stateMonths = expensesInterval?.data.filter((expense) => {
      const currentMonth = new Date(expense.expenseDate).getMonth()

      return currentMonth === month
    })

    for (let i = 0; i < firstDay - 1; i++) {
      days.push(null)
    }

    for (let i = 1; i <= lastDate; i++) {
      const info = stateMonths?.filter((expense) => {
        const currentDay = new Date(expense.expenseDate).getDate()

        console.log(`currentDay: ${expense.expenseDate} \n day: ${currentDay}`)

        return currentDay === i
      })

      days.push({
        date: new Date(year, month, i),
        info,
      })
    }

    return days
  }, [currentDate, expensesInterval])

  useEffect(() => {
    refetch()
  }, [currentDate])

  return (
    <div className="flex-col w-full h-full space-y-5">
      <div className="flex justify-center gap-3">
        <button
          onClick={() => {
            handlePrevMonth()
          }}
        >
          <HeroIcons name="ChevronLeftIcon" />
        </button>

        <span>{formatDateToMonthYear(currentDate)}</span>

        <button
          onClick={() => {
            handleNextMonth()
          }}
        >
          <HeroIcons name="ChevronRightIcon" />
        </button>
      </div>

      <div className="flex gap-2 py-2 px-5 rounded-xl bg-gray-200 justify-between">
        <span className="text-gray-400 font-bold flex-grow text-center">
          Lunes
        </span>
        <span className="text-gray-400 font-bold flex-grow text-center">
          Martes
        </span>
        <span className="text-gray-400 font-bold flex-grow text-center">
          Miercoles
        </span>
        <span className="text-gray-400 font-bold flex-grow text-center">
          Jueves
        </span>
        <span className="text-gray-400 font-bold flex-grow text-center">
          Viernes
        </span>
        <span className="text-gray-400 font-bold flex-grow text-center">
          Sabado
        </span>
        <span className="text-gray-400 font-bold flex-grow text-center">
          Domingo
        </span>
      </div>
      <div className="border rounded-md h-auto grid grid-cols-7 overflow-hidden">
        {days.map((i) => {
          if (!i) return <NullSquare />

          //console.log(`date: ${i.date.toLocaleDateString()} \n info: ${i.info}`)

          return (
            <CalendarSquare
              {...i}
              current={
                currentDate.toLocaleDateString() == i.date.toLocaleDateString()
              }
              key={i.date.getDate()}
            />
          )
        })}
      </div>
    </div>
  )
}
