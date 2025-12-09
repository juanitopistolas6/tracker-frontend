export interface IRegister {
  user: string
  name: string
  password: string
  salary: number
  paymentDays: number[]
  balance: number
  paymentFrequency: 'weekly' | 'biweekly'
}
