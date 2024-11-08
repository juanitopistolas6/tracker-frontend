export interface IUser {
  id: string
  user: string
  name: string
  paymentDays: number[]
  paymentFrequency: string
  salary: number
  balance: number
  is_saving: boolean
  savings: number
  createdAt: Date
}
