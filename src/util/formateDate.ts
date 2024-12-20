export function formatDate(date: Date): string {
  const day = date.getDate()
  const month = date.toLocaleString('default', { month: 'short' })
  const year = date.getFullYear()

  return `${day}, ${month} ${year}`
}
