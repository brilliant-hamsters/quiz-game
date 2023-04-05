type User = {
  avatar?: string
  display_name?: string
  email: string
  first_name: string
  id: number
  login: string
  phone: string
  second_name: string
  password: string
}

type DataAuth = Pick<User, 'login' | 'password'>
