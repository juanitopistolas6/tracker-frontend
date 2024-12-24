import * as React from 'react'
import { add, format } from 'date-fns'
import { Calendar as CalendarIcon } from 'lucide-react'

import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { TimePickerDemo } from './time-picker-demo'

export function DateTimePicker({
  value,
  onChange,
}: {
  value?: Date
  onChange: (date: Date | undefined) => void
}) {
  const [date, setDate] = React.useState<Date>()

  React.useEffect(() => {
    setDate(value) // Sincronizar el estado interno cuando `value` cambia desde fuera
  }, [value])

  /**
   * carry over the current time when a user clicks a new day
   * instead of resetting to 00:00
   */
  const handleSelect = (newDay: Date | undefined) => {
    if (!newDay) return
    if (!date) {
      onChange(newDay)
      setDate(newDay)

      return
    }
    const diff = newDay.getTime() - date.getTime()
    const diffInDays = diff / (1000 * 60 * 60 * 24)
    const newDateFull = add(date, { days: Math.ceil(diffInDays) })
    setDate(newDateFull)
  }

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant={'outline'}
          className={cn(
            'w-full justify-start text-left h-14 font-normal ',
            !date && 'text-muted-foreground'
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {date ? (
            format(date, 'PPP HH:mm:ss')
          ) : (
            <span>Selecciona una fecha</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0">
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => handleSelect(d)}
          initialFocus
        />
        <div className="p-3 border-t border-border">
          <TimePickerDemo
            setDate={(newDate) => {
              setDate(newDate)
              onChange(newDate)
            }}
            date={date}
          />
        </div>
      </PopoverContent>
    </Popover>
  )
}
