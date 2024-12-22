import { useExpense } from '../context/expenses-context'
import { ExpenseType } from './expense-type'
import { months } from '../util/monthString'

export const Expenses = () => {
  const { expenses, hasNextPage, fetchNextPage } = useExpense()

  if (!expenses || expenses.length === 0) return

  let currentDate: Date = new Date(expenses[0].expenseDate)

  return (
    <div className="w-full h-full flex-col flex space-y-2">
      <div className="border-b-2 text-black py-2 px-5 font-bold">
        <span>{`${currentDate.getDate()} de ${months[currentDate.getMonth() + 1]}`}</span>
      </div>
      <div className="flex-col w-full space-y-2 h-1/2">
        {expenses?.map((item, i) => {
          const itemDate = new Date(item.expenseDate)

          if (currentDate.getDate() !== itemDate.getDate()) {
            currentDate = itemDate

            return (
              <>
                <div
                  className="border-b-2 text-black py-2 px-5 font-bold"
                  key={`day: ${i}`}
                >
                  <span
                    key={i}
                  >{`${currentDate.getDate()} de ${months[currentDate.getMonth() + 1]}`}</span>
                </div>
                <ExpenseType {...item} key={i} />
              </>
            )
          }

          return <ExpenseType {...item} key={i} />
        })}
      </div>

      {hasNextPage && (
        <div className="flex justify-center">
          <button
            className="font-bold rounded-xl hover:bg-gray-300 p-2"
            onClick={() => fetchNextPage()}
          >
            Load more...
          </button>
        </div>
      )}
    </div>
  )
}
