import { IExpense } from '@/util/interfaces'
import { NavLink } from 'react-router-dom'

interface squareProps {
  date: Date
  current?: boolean
  info: IExpense[] | undefined
}

export const CalendarSquare = (square: squareProps) => {
  const { current, date, info } = square
  const colorArrays = [
    'bg-green-400',
    'bg-red-600',
    'bg-blue-600',
    'bg-pink-500',
  ]
  const overInfo = info?.length && info.length > 3 ? info.length - 3 : null

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
    <NavLink
      to={date.toISOString()}
      className="h-36 border flex-col p-2 space-y-3"
    >
      <div className="font-bold flex justify-between">
        <div className="flex gap-3">
          <span className="text-xl">{date.getDate()}</span>
          {current && (
            <div className="flex w-full h-auto items-center">
              <div className="rounded-full bg-black w-2 h-2"></div>
            </div>
          )}
        </div>

        {overInfo && (
          <div className="rounded-full bg-gray-300 flex items-center text-sm p-1 px-2">
            {`+${overInfo}`}
          </div>
        )}
      </div>

      <div className="flex-col space-y-2">
        {info?.slice(0, 3).map((expense, index) => {
          const color = getRandomColor(colorArrays)

          return (
            <div key={index} className="flex gap-2">
              <span className={`w-1 py-1 ${color ? color : ''}`}></span>
              <span>{`${expense.description.slice(0, 12)}...`}</span>
            </div>
          )
        })}
      </div>
    </NavLink>
  )
}
