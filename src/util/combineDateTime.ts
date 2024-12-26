export function combineDateAndTime(dateStr?: string, timeStr?: string) {
  if (!dateStr || !timeStr) return new Date()

  const [time, meridian] = timeStr.split(' ')
  const [hours, minutes] = time.split(':').map(Number)

  const adjustedHours =
    meridian === 'PM' && hours !== 12
      ? hours + 12
      : meridian === 'AM' && hours === 12
        ? 0
        : hours

  const date = new Date(dateStr)

  date.setHours(adjustedHours, minutes, 0, 0)

  return date
}
