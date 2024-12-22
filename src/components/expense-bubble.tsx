import { HeroIcons } from '@/util/hero-icons'
import { IExpense } from '@/util/interfaces'
import { formatDateToTime } from '../util/getTime'

const ExpenseBubble = (props: {
  hour: string
  expenses: IExpense[] | undefined
}) => {
  const { hour, expenses } = props

  //console.log(expenses)

  return (
    <div className="flex gap-5 justify-between relative pb-5 group">
      <button className="absolute left-1/2 transform -translate-x-1/2 -top-4 border py-1 px-2 flex bg-white rounded-md gap-2 opacity-0 invisible transition-opacity duration-300 group-hover:opacity-100 group-hover:visible">
        <HeroIcons name="PlusIcon" />
        <span>Añadir gasto</span>
      </button>

      <span className="relative -top-3">{hour}</span>

      <div className="border-t-2 flex-grow py-2 px-1 flex-col space-y-3">
        {expenses?.map((item, index) => {
          return (
            <div className="bg-gray-200 rounded-xl flex-col p-2" key={index}>
              <h1 className="font-bold">{item.description}</h1>
              <span className="text-gray-400 font-bold text-sm">
                {formatDateToTime(new Date(item.expenseDate))}
              </span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default ExpenseBubble
