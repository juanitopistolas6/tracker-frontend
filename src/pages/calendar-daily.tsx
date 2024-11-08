import { useParams } from 'react-router-dom'
import { hoursArray } from '../util/day-hours'
import { HeroIcons } from '../util/hero-icons'

export const CalendarDaily = () => {
  const { date } = useParams()

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
        <h1 className="text-2xl ">Calendario para el 5, Nov 2024</h1>
        <span className="text-gray-400">
          Ve y modifica toda la actividad de este dia
        </span>
      </div>

      <div className="flex-col space-y-3">
        {hoursArray.map((hour) => {
          return (
            <div className="flex gap-5 justify-between relative pb-5 group">
              <button className="absolute left-1/2 transform -translate-x-1/2 -top-4 border py-1 px-2 flex bg-white rounded-md gap-2 opacity-0 invisible transition-opacity duration-300 group-hover:opacity-100 group-hover:visible">
                <HeroIcons name="PlusIcon" />
                <span>Añadir gasto</span>
              </button>

              <span className="relative -top-3">{hour}</span>

              <div className="border-t-2 flex-grow py-2 px-1">
                <div className="bg-gray-200 rounded-xl flex-col p-2">
                  <h1 className="font-bold">Descripcion...</h1>
                  <span className="text-gray-400 font-bold text-sm">
                    1:22 PM
                  </span>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </div>
  )
}
