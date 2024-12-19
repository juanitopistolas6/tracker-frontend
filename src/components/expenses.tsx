import { useExpense } from '../context/expenses-context'
import { ExpenseType } from './expense-type'
import { months } from '../util/monthString'

export const Expenses = () => {
  const { state, hasNextPage } = useExpense()

  if (!state.expenses || state.expenses.length === 0) return

  let currentDate: Date = new Date(state?.expenses[0].expenseDate)

  return (
    <div className="w-full h-full flex-col flex space-y-2">
      <div className="border-b-2 text-gray-400 py-2 px-5 font-bold">
        <span>{`${currentDate.getDate()} de ${months[currentDate.getMonth() + 1]}`}</span>
      </div>
      {state.expenses?.map((item, i) => {
        const itemDate = new Date(item.expenseDate)

        if (currentDate.getDate() !== itemDate.getDate()) {
          currentDate = itemDate

          return (
            <>
              <div
                className="border-b-2 text-gray-400 py-2 px-5 font-bold"
                key={`day: ${i}`}
              >
                <span>{`${currentDate.getDate()} de ${months[currentDate.getMonth() + 1]}`}</span>
              </div>
              <ExpenseType {...item} key={i} />
            </>
          )
        }

        return <ExpenseType {...item} key={i} />
      })}

      {hasNextPage && (
        <div className="flex justify-center">
          <button className="font-bold rounded-xl hover:bg-gray-300 p-2">
            Load more...
          </button>
        </div>
      )}
    </div>
  )
}
