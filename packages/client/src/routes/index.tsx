import { GamePage } from "../pages/GamePage";
import { GameStart } from '../pages/GameStart'

interface IRoute {
    /**
     * Идентификатор роута
     */
    id: string | number;
    /**
     * Адрес страницы
     */
    path: string;
    /**
     * Компонент страницы
     */
    component: () => JSX.Element;
    /**
     * Страница доступна только авторизованному пользователю
     */
    isPrivate: boolean;
}

export const routes: IRoute[] = [
  {
    id: 'game',
    path: '/',
    component: GamePage,
    isPrivate: true
  },
  {
    id: 'start',
    path: '/start',
    component: () => <GameStart />,
    isPrivate: true
  },
  {
    id: 'end',
    path: '/end',
    component: () => <div>End</div>,
    isPrivate: true
  },
  {
    id: 'leaderBoard',
    path: '/leader_board',
    component: () => <div>Leader Board</div>,
    isPrivate: true
  },
  {
    id: 'forum',
    path: '/forum',
    component: () => <div>Forum</div>,
    isPrivate: true
  },
  {
    id: 'auth',
    path: '/auth',
    component: () => <div>Auth</div>,
    isPrivate: false
  },
  {
    id: 'signUp',
    path: '/sign_up',
    component: () => <div>Sign Up</div>,
    isPrivate: false
  }
]
