import { useExpense } from '../context/expenses-context'
import { ExpenseType } from './expense-type'

export const Expenses = () => {
  const { state, hasNextPage } = useExpense()

  return (
    <div className="w-full h-full flex-col flex space-y-2">
      <div className="border-b-2 text-gray-400 py-2 px-5 font-bold">
        <span>Today</span>
      </div>

      {state.expenses?.map((item, i) => {
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
