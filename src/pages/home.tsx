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
  Tooltip,
} from '@mui/material'
import { useExpense } from '@/context/expenses-context'
import { IFilter } from '@/util/interfaces'
import { useMemo } from 'react'

export const HomePage = () => {
  const { handleClose, handleOpen, open } = useModal()
  const { stats } = useAuth()
  const { setFilter, expenses } = useExpense()

  const { balance, savings, totalExpenses, salary } = stats?.data ?? {}

  const total = useMemo(
    () => (balance ?? 0) + (savings ?? 0) + (totalExpenses ?? 0),
    [stats]
  )

  const savingsPorcentage = useMemo(() => {
    return (((savings ?? 0) * 100) / total).toFixed(2)
  }, [savings, total])

  const balancePorcentage = useMemo(() => {
    return (((balance ?? 0) * 100) / total).toFixed(2)
  }, [balance, total])

  const totalExpensesPorcentage = useMemo(() => {
    return (((totalExpenses ?? 0) * 100) / total).toFixed(2)
  }, [totalExpenses, total])

  const handleChange = (event: SelectChangeEvent) => {
    setFilter(event.target.value as IFilter)
  }

  const expensesLenght = useMemo(() => {
    return expenses?.reduce((acc, current) => {
      return current.type === 'expense' ? acc + 1 : acc
    }, 0)
  }, [expenses])

  const savingsLenght = useMemo(() => {
    return expenses?.reduce((acc, current) => {
      return current.type === 'saving' ? acc + 1 : acc
    }, 0)
  }, [expenses])

  const depositsLenght = useMemo(() => {
    return expenses?.reduce((acc, current) => {
      return current.type === 'deposit' ? acc + 1 : acc
    }, 0)
  }, [expenses])

  const progressStyles = useMemo(
    () => ({
      expenses: {
        width: `${totalExpensesPorcentage}%`,
        backgroundColor: 'red',
      },
      balance: { width: `${balancePorcentage}%`, backgroundColor: 'green' },
      savings: { width: `${savingsPorcentage}%`, backgroundColor: 'yellow' },
    }),
    [totalExpensesPorcentage, balancePorcentage]
  )

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

            <div className="font-bold text-3xl">
              {total.toLocaleString('en-US')}
            </div>
          </div>

          <div className="w-full flex items-end py-1">
            <div className="w-full rounded-3xl border flex relative h-4 overflow-hidden">
              <Tooltip title="Gastos" placement="top" arrow>
                <span style={progressStyles.expenses}></span>
              </Tooltip>

              <Tooltip title="Balance" placement="top" arrow>
                <span style={progressStyles.balance}></span>
              </Tooltip>

              <Tooltip title="Ahorros" placement="top" arrow>
                <span style={progressStyles.savings}></span>
              </Tooltip>
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

            <div className="text-3xl font-bold text-black">{`$${salary?.toLocaleString('es-MX')}`}</div>
          </div>

          <div className="flex flex-col items-start text-gray-800">
            <div className="flex justify-between w-full text-sm font-semibold text-stone-900-400">
              <span>Balance</span>
              <span>{`${balancePorcentage}%`}</span>
            </div>

            <div className="text-3xl font-bold text-black">{`$${balance?.toLocaleString('es-MX')}`}</div>
          </div>

          <div className="flex flex-col items-start text-gray-800">
            <div className="flex justify-between w-full text-sm font-semibold text-yellow-400">
              <span>Ahorros</span>
              <span>{`${savingsPorcentage}%`}</span>
            </div>

            <div className="text-3xl font-bold text-black">{`$${savings?.toLocaleString('es-MX')}`}</div>
          </div>

          <div className="flex flex-col items-start text-gray-800">
            <div className="flex justify-between w-full text-sm font-semibold text-red-600">
              <span>Gastos</span>
              <span>{`${totalExpensesPorcentage}%`}</span>
            </div>

            <div className="text-3xl font-bold text-black">
              {totalExpenses?.toLocaleString('en-US')}
            </div>
          </div>
        </div>

        {/* Transactions */}
        <div className="flex h-auto justify-between">
          <div className="flex-col">
            <h1 className="font-bold text-2xl">Transacciones</h1>
            <span>{`Usted ha tenido ${depositsLenght} ingresos, ${expensesLenght} gastos y ${savingsLenght} ahorros`}</span>
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
