export interface IExpense {
  id: string
  description: string
  amount: number
  available: boolean
  type: 'deposit' | 'saving' | 'expense'
  status: 'pending' | 'success'
  expenseDate: Date
  authorId: string
}

export interface ICreateExpense {
  description: string
  amount: number
  type?: 'deposit' | 'saving' | 'expense'
  status?: 'pending' | 'success'
  expenseDate?: Date
}
