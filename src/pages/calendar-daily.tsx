import { useParams } from 'react-router-dom'
import { hoursArray } from '../util/day-hours'
import { useAxios } from '@/hooks/useAxios'
import { useQuery } from '@tanstack/react-query'
import { IExpense, IResponse } from '@/util/interfaces'
import ExpenseBubble from '@/components/expense-bubble'
import { useMemo } from 'react'
import { formatDate } from '@/util/formateDate'

interface IHour {
  time: string
  expenses: IExpense[] | undefined
}

export const CalendarDaily = () => {
  const { axios } = useAxios()
  const { date } = useParams()

  const { data: expenses } = useQuery({
    queryKey: ['expense-day'],
    queryFn: async () => {
      const response = await axios.get<IResponse<IExpense[]>>(`/expense/date`, {
        params: { date },
      })

      return response.data
    },
  })

  const formatedDate = date ? formatDate(new Date(date)) : 'Fecha indefinida...'

  const hoursFiltered = useMemo(() => {
    let hours: IHour[] = []

    for (let i = 0; i <= hoursArray.length; i++) {
      const currentHours =
        expenses?.data?.filter((expense) => {
          console.log(
            `hora: ${new Date(expense.expenseDate).getHours()}\ni:${i} \ndescription: ${expense.description} \n${new Date(expense.expenseDate).getHours() === i}`
          )

          return new Date(expense.expenseDate).getHours() === i
        }) ?? undefined

      const item = { time: hoursArray[i], expenses: currentHours }

      hours.push(item)
    }

    return hours
  }, [expenses])

  const colorArrays = ['green', 'red', 'blue', 'pink']

  function getRandomColor(array: string[]) {
    if (array.length === 0) {
      return null
    }

    const randomIndex = Math.floor(Math.random() * colorArrays.length)
    const color = colorArrays[randomIndex]

    colorArrays.splice(randomIndex, 1)

    return color
  }

  return (
    <div className="flex-col w-full h-5/6 border rounded-xl overflow-y-auto space-y-8 p-5">
      <div className="flex-col space-y-1 border-b">
        <h1 className="text-2xl ">{`Calendario de actividades para el ${formatedDate}`}</h1>
        <span className="text-gray-400">
          Ve y modifica toda la actividad de este dia
        </span>
      </div>

      <div className="flex-col space-y-3">
        {hoursFiltered.map((item, index) => {
          const { expenses, time } = item

          return <ExpenseBubble hour={time} expenses={expenses} key={index} />
        })}
      </div>
    </div>
  )
}
