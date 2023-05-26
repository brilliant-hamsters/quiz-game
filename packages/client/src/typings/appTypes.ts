export type User = {
  avatar?: string
  display_name: string
  email: string
  first_name: string
  id: number
  login: string
  phone: string
  second_name: string
  password: string
  oldPassword: string
  newPassword: string
}

export type TLeaderboardItem = {
  id: number
  login: string
  result: number
}

export type Theme = {
  themeId?: number
  theme: string
  active?: boolean
}

export type ThemesList = Theme[]

export type Message = {
  themeId: number
  author: string
  text: boolean
  date: string
}

export type MessagesList = Message[]

export type DataAuth = Pick<User, 'login' | 'password'>
export type DataRegister = Omit<
  User,
  'id' | 'display_name' | 'oldPassword' | 'newPassword'
>
export type DataProfile = Omit<User, 'id' | 'avatar' | 'password'>
