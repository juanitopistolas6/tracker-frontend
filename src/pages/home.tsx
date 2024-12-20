import { HeroIcons } from '../util/hero-icons'
import { Expenses } from '../components/expenses'
import { useModal } from '../hooks/useModal'
import { ExpenseModal } from '../components/modals/expense-modal'
import { Modal } from '../components/modals/modal'
import { useAuth } from '@/context/auth-context'
import {
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from '@mui/material'
import { useExpense } from '@/context/expenses-context'
import { IFilter } from '@/util/interfaces'

export const HomePage = () => {
  const { handleClose, handleOpen, open } = useModal()
  const { user } = useAuth()
  const { setFilter } = useExpense()

  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value as IFilter)
  }

  return (
    <>
      <Modal
        open={open}
        closeModal={handleClose}
        className="flex items-start top-1/2 transform -translate-y-1/2 justify-center w-full h-full"
      >
        <ExpenseModal handleClose={handleClose} />
      </Modal>
      <div className="flex-col space-y-12">
        <div className="text-4xl font-bold">
          <h1>Summer</h1>
        </div>

        {/* Total info */}
        <div className="flex justify-between gap-10">
          <div className="flex-col">
            <div className="font-bold text-sm">
              <h1 className="text-blue-600">Total</h1>
            </div>

            <div className="font-bold text-3xl">$219,000.00</div>
          </div>

          <div className="w-full flex items-end py-1">
            <div className="w-full rounded-3xl border flex relative h-4 overflow-hidden">
              <span className="w-1/3 bg-red-600"></span>
              <span className="w-2/3 bg-green-600"></span>
            </div>
          </div>
        </div>

        {/* Income, Expense, Savings */}
        <div className="flex gap-10">
          <div className="flex flex-col items-start text-gray-800">
            <div className="flex justify-between w-full text-sm font-semibold text-green-600">
              <span>Income</span>
              <span></span>
            </div>

            <div className="text-3xl font-bold text-black">{`$${user?.salary.toFixed(2)}`}</div>
          </div>

          <div className="flex flex-col items-start text-gray-800">
            <div className="flex justify-between w-full text-sm font-semibold text-stone-900-400">
              <span>Balance</span>
              <span>23%</span>
            </div>

            <div className="text-3xl font-bold text-black">{`$${user?.balance.toFixed(2)}`}</div>
          </div>

          <div className="flex flex-col items-start text-gray-800">
            <div className="flex justify-between w-full text-sm font-semibold text-yellow-400">
              <span>Savings</span>
              <span>23%</span>
            </div>

            <div className="text-3xl font-bold text-black">{`$${user?.savings.toFixed(2)}`}</div>
          </div>

          <div className="flex flex-col items-start text-gray-800">
            <div className="flex justify-between w-full text-sm font-semibold text-red-600">
              <span>Expenses</span>
              <span>73%</span>
            </div>

            <div className="text-3xl font-bold text-black">$87,600.34</div>
          </div>
        </div>

        {/* Transactions */}
        <div className="flex h-auto justify-between">
          <div className="flex-col">
            <h1 className="font-bold text-2xl">Transactions</h1>
            <span>Usted ha tenido 2 ingresos y 10 gastos</span>
          </div>

          <div className="flex gap-4 h-auto">
            <FormControl className="w-40">
              <InputLabel id="demo-simple-select-label">Filtros</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                defaultValue="todos"
                label="Filtros"
                onChange={handleChange}
              >
                <MenuItem value={'todos'}>Todos</MenuItem>
                <MenuItem value={'saving'}>Ahorros</MenuItem>
                <MenuItem value={'deposit'}>Depositos</MenuItem>
                <MenuItem value={'expense'}>Gastos</MenuItem>
              </Select>
            </FormControl>

            <button
              className="flex gap-1 items-center h-auto text-white rounded-full bg-black px-4"
              onClick={handleOpen}
            >
              <HeroIcons name="PlusIcon" stroke={2} />
              <span>Añadir</span>
            </button>
          </div>
        </div>

        {/* Expenses */}

        <Expenses />
      </div>
    </>
  )
}
