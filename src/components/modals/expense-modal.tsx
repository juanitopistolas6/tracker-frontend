import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from '@mui/material'
import { HeroIcons } from '../../util/hero-icons'
import { Controller, useForm } from 'react-hook-form'
import { useExpense } from '../../context/expenses-context'
import { DateTimePicker } from '@/util/time-picker/date-time-picker'
import { useEffect } from 'react'

interface ExpenseProps {
  handleClose: () => void
}

interface formValues {
  amount: number
  description: string
  expenseDate?: Date
  type?: 'expense' | 'deposit' | 'saving'
}

export function ExpenseModal(props: ExpenseProps) {
  const { handleClose } = props
  const { createExpense } = useExpense()
  const {
    register,
    control,
    handleSubmit,
    watch,
    reset,
    formState: { errors },
  } = useForm<formValues>()

  const onSubmit = (data: formValues) => {
    createExpense(data)
  }

  useEffect(() => {
    const { unsubscribe } = watch((value) => {
      console.log(value)
    })
    return () => unsubscribe()
  }, [watch])

  return (
    <div className="w-[500px] h-full bg-white rounded-xl p-3 space-y-5 flex-col">
      <div className="flex justify-between">
        <button onClick={handleClose}>
          <HeroIcons name="XMarkIcon" />
        </button>
      </div>

      <form className="flex-col space-y-3" onSubmit={handleSubmit(onSubmit)}>
        <h1 className="text-3xl ">Crea una nueva accion</h1>

        <div className="flex justify-between gap-14">
          <div className="flex-col space-y-3 w-full">
            <TextField
              label="Monto"
              {...register('amount', { valueAsNumber: true })}
            />

            {errors.amount && (
              <p style={{ color: 'red' }}>{errors.amount.message}</p>
            )}
          </div>

          <FormControl className="w-full">
            <InputLabel id="demo-simple-select-label">Age</InputLabel>
            <Controller
              name="type"
              control={control}
              defaultValue="expense"
              rules={{
                required: 'Este campo es obligatorio',
              }}
              render={({ field }) => (
                <Select
                  {...field}
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  label="Age"
                >
                  <MenuItem value={'expense'}>Expense</MenuItem>
                  <MenuItem value={'deposit'}>Deposit</MenuItem>
                  <MenuItem value={'saving'}>Saving</MenuItem>
                </Select>
              )}
            />
            {errors.type && (
              <p style={{ color: 'red' }}>{errors.type.message}</p>
            )}
          </FormControl>
        </div>

        <div className="flex justify-between gap-14 items-center">
          <Controller
            control={control}
            name="expenseDate"
            render={({ field: { value, onChange } }) => (
              <DateTimePicker onChange={onChange} value={value} />
            )}
          />
        </div>

        <div className="flex justify-between w-full">
          <TextField
            label="Descripcion"
            className="w-full h-12"
            {...register('description')}
          />
        </div>

        <div className="flex justify-center gap-7 w-full ">
          <button
            className="px-5 py-2 rounded-xl bg-gray-300 flex gap-2 justify-between"
            onClick={() => reset()}
          >
            <span>Limpiar</span>
            <HeroIcons name="TrashIcon" />
          </button>

          <button
            className="px-6 py-2 rounded-xl bg-black text-white flex gap-2 justify-between"
            type="submit"
          >
            <span>Editar</span>
            <HeroIcons name="PaperAirplaneIcon" />
          </button>
        </div>
      </form>
    </div>
  )
}
