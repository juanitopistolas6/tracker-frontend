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
import { IResponse } from '@/util/interfaces/response'
import { useAxios } from '@/hooks/useAxios'
import { IExpense } from '@/util/interfaces'
import { useQuery } from '@tanstack/react-query'

interface ExpenseProps {
  action: 'edit' | 'create'
  handleClose: () => void
  id?: string
}

interface formValues {
  amount: number
  description: string
  expenseDate?: Date
  type?: 'expense' | 'deposit' | 'saving'
}

function ExpenseModal(props: ExpenseProps) {
  const { handleClose, action, id } = props
  const { axios } = useAxios()
  const { createExpense, editExpense } = useExpense()

  const { data: expense } = useQuery({
    enabled: action === 'edit',
    queryKey: [`${id}`, 'expense'],
    queryFn: async () => {
      const response = await axios.get<IResponse<IExpense>>(`/expense/${id}`)

      const { data } = response

      return data
    },
  })

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<formValues>({ values: expense?.data })

  const onSubmit = (data: formValues) => {
    if (!id && action == 'edit') return

    action === 'create'
      ? createExpense(data)
      : editExpense({ expense: data, id: id! })

    handleClose()
  }

  return (
    <div className="w-[500px] h-full bg-white rounded-xl pt-3 space-y-5 flex-col">
      <div className="flex justify-between px-3">
        <button onClick={handleClose}>
          <HeroIcons name="XMarkIcon" />
        </button>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex-col space-y-4 px-3">
          <h1 className="text-3xl ">Crea una nueva accion</h1>

          <div className="flex justify-between gap-14">
            <div className="flex-col space-y-3 w-full">
              <TextField
                label="Monto"
                {...register('amount', {
                  valueAsNumber: true,
                })}
              />

              {errors.amount && (
                <p style={{ color: 'red' }}>{errors.amount.message}</p>
              )}
            </div>

            <FormControl className="w-full">
              <InputLabel id="demo-simple-select-label">Tipo</InputLabel>
              <Controller
                name="type"
                control={control}
                defaultValue={expense?.data.type ?? 'expense'}
                rules={{
                  required: 'Este campo es obligatorio',
                }}
                render={({ field }) => (
                  <Select
                    {...field}
                    disabled={action === 'edit'}
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
        </div>

        <div className="flex justify-center items-center w-full px-0 object-cover overflow-hidden mt-5">
          <button
            className="w-full justify-center bg-black text-white flex gap-2 h-12 items-center"
            type="submit"
          >
            <span className="text-xl">
              {action === 'create' ? 'Crear' : 'Editar'}
            </span>
            <HeroIcons name="PaperAirplaneIcon" />
          </button>
        </div>
      </form>
    </div>
  )
}

export default ExpenseModal
