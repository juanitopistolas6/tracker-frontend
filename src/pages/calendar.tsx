import { useMemo, useState } from 'react'
import { HeroIcons } from '../util/hero-icons'
import { CalendarSquare } from '../components/calendar-square'
import { NullSquare } from '../components/null-square'
import { useExpense } from '@/context/expenses-context'

export const Calendar = () => {
  const { state } = useExpense()
  const [currentDate, setCurrentDate] = useState(new Date())

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
    const stateMonths = state.expenses?.filter((expense) => {
      const currentMonth = new Date(expense.expenseDate).getMonth()

      return currentMonth === month
    })

    for (let i = 0; i < firstDay - 1; i++) {
      days.push(null)
    }

    for (let i = 1; i <= lastDate; i++) {
      const info = stateMonths?.filter((expense) => {
        const currentDay = new Date(expense.expenseDate).getDate()

        return currentDay === i
      })

      days.push({
        date: new Date(year, month, i),
        info,
      })
    }

    return days
  }, [currentDate, state])

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

        <span>{currentDate.toDateString()}</span>

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

          return (
            <CalendarSquare
              date={i.date}
              info={i.info}
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
