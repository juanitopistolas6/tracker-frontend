interface squareProps {
  date: Date
  current?: boolean
}

export const CalendarSquare = (square: squareProps) => {
  const { current, date } = square
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
    <div className="h-36 border flex-col p-2 space-y-3">
      <div className="font-bold flex justify-between">
        <div className="flex gap-3">
          <span className="text-xl">{date.getDate()}</span>
          {current && (
            <div className="flex w-full h-auto items-center">
              <div className="rounded-full bg-black w-2 h-2"></div>
            </div>
          )}
        </div>

        <div className="rounded-full bg-gray-300 flex items-center text-sm px-1">
          +20
        </div>
      </div>

      <div className="flex-col space-y-2">
        {Array.from({ length: 3 }).map((_, index) => {
          const color = getRandomColor(colorArrays)

          return (
            <div key={index} className="flex gap-2">
              <span className={`w-1 py-1 bg-${color}-600`}></span>
              <span>description</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}
