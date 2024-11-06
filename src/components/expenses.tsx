import { HeroIcons } from '../util/hero-icons'

export const Expenses = () => {
  return (
    <div className="w-full h-full flex-col flex space-y-2">
      <div className="border-b-2 text-gray-400 py-2 px-5 font-bold">
        <span>Today</span>
      </div>

      <div className="border-b-2 flex py-2 relative px-5">
        <div className="flex gap-2 relative left-0">
          <HeroIcons
            name="ArrowDownLeftIcon"
            className="text-red-600 h-6 w-6"
            stroke={3}
          />
          <span>Expense</span>
        </div>

        <span className="flex-grow text-center">
          A description about the expense...
        </span>

        <span className="font-bold right-0">-$16.99</span>

        <button className="absolute -right-10 rounded-full hover:bg-gray-200 my-auto flex items-center p-2 top-1/2 transform -translate-y-1/2">
          <HeroIcons
            name="EllipsisVerticalIcon"
            className="text-black w-5 h-5"
            stroke={2}
          />
        </button>
      </div>

      <div className="border-b-2 flex py-2 relative px-5">
        <div className="flex gap-2 left-0 relative">
          <HeroIcons
            name="ArrowUpRightIcon"
            className="text-green-600 h-6 w-6"
            stroke={3}
          />
          <span>Deposit</span>
        </div>

        <span className="flex-grow text-center">
          A description about the deposit...
        </span>

        <span className="relative right-0">$1000.00</span>

        <button className="absolute -right-10 rounded-full hover:bg-gray-200 my-auto flex items-center p-2 top-1/2 transform -translate-y-1/2">
          <HeroIcons
            name="EllipsisVerticalIcon"
            className="text-black w-5 h-5"
            stroke={2}
          />
        </button>
      </div>

      <div className="border-b-2 flex py-2 relative px-5">
        <div className="flex gap-2 left-0 relative">
          <HeroIcons
            name="ArrowUpRightIcon"
            className="text-yellow-300 h-6 w-6"
            stroke={3}
          />
          <span>Saving</span>
        </div>

        <span className="flex-grow text-center">
          A description about the saving...
        </span>

        <span className="relative right-0">$1000.00</span>

        <button className="absolute -right-10 rounded-full hover:bg-gray-200 my-auto flex items-center p-2 top-1/2 transform -translate-y-1/2">
          <HeroIcons
            name="EllipsisVerticalIcon"
            className="text-black w-5 h-5"
            stroke={2}
          />
        </button>
      </div>

      <div className="flex justify-center">
        <button className="font-bold rounded-xl hover:bg-gray-300 p-2">
          Load more...
        </button>
      </div>
    </div>
  )
}
