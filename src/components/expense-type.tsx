import { HeroIcons, IconName } from '../util/hero-icons'

interface IExpenseType {
  type: 'saving' | 'deposit' | 'expense'
  amount: number
  description: string
}

type IconConfig = {
  name: IconName
  color: string
}

const iconMapping: Record<string, IconConfig> = {
  expense: { name: 'ArrowDownLeftIcon', color: 'text-red-600' },
  deposit: { name: 'ArrowUpRightIcon', color: 'text-green-600' },
  saving: { name: 'ArrowUpRightIcon', color: 'text-yellow-300' },
}

export const ExpenseType = (expenseProps: IExpenseType) => {
  const { amount, description, type } = expenseProps

  const icon = iconMapping[type]

  return (
    <div className="border-b-2 flex py-2 relative px-5">
      <div className="flex gap-2 relative left-0 w-24">
        <HeroIcons
          name={icon.name}
          className={`h-6 w-6 ${icon.color}`}
          stroke={3}
        />
        <span>{type}</span>
      </div>

      <span className="flex-grow text-center">{description}</span>

      <span className="font-bold right-0 w-24 text-right">{`${type == 'expense' ? '-' : ''}$${amount}`}</span>

      <button className="absolute -right-10 rounded-full hover:bg-gray-200 my-auto flex items-center p-2 top-1/2 transform -translate-y-1/2">
        <HeroIcons
          name="EllipsisVerticalIcon"
          className="text-black w-5 h-5"
          stroke={2}
        />
      </button>
    </div>
  )
}
