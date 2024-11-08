import { IUser } from './user'

export interface ILoginResponse {
  token: string
  user: IUser
}
