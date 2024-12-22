function formatDateToMonthYear(date: Date): string {
  const months = [
    'Enero',
    'Febrero',
    'Marzo',
    'Abril',
    'Mayo',
    'Junio',
    'Julio',
    'Agosto',
    'Septiembre',
    'Octubre',
    'Noviembre',
    'Diciembre',
  ]

  const month = months[date.getMonth()]
  const year = date.getFullYear()

  return `${month} ${year}`
}

export default formatDateToMonthYear
