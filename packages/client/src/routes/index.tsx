import { GamePage } from '../pages/GamePage'
import { GameEnd } from '../pages/GameEnd'
import { GameStart } from '../pages/GameStart'
import Profile from '../pages/Profile/Profile'
import Login from '../pages/Login/Login'
import Register from '../pages/Register/Register'

interface IRoute {
  /**
   * Идентификатор роута
   */
  id: string | number
  /**
   * Адрес страницы
   */
  path: string
  /**
   * Компонент страницы
   */
  component: () => JSX.Element
  /**
   * Страница доступна только авторизованному пользователю
   */
  isPrivate: boolean
}

export const routes: IRoute[] = [
  {
    id: 'game',
    path: '/',
    component: GamePage,
    isPrivate: true,
  },
  {
    id: 'start',
    path: '/start',
    component: GameStart,
    isPrivate: true,
  },
  {
    id: 'end',
    path: '/end',
    component: GameEnd,
    isPrivate: true,
  },
  {
    id: 'leaderBoard',
    path: '/leader_board',
    component: () => <div>Leader Board</div>,
    isPrivate: true,
  },
  {
    id: 'forum',
    path: '/forum',
    component: () => <div>Forum</div>,
    isPrivate: true,
  },
  {
    id: 'auth',
    path: '/auth',
    component: () => <Login />,
    isPrivate: false,
  },
  {
    id: 'signUp',
    path: '/sign_up',
    component: () => <Register />,
    isPrivate: false,
  },
  {
    id: 'profile',
    path: '/profile',
    component: () => <Profile />,
    isPrivate: true,
  },
]
