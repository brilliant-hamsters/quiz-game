import { Login } from "../pages/Login/Login";
import { Register } from "../pages/Register/Register";

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
    component: () => <div>Game</div>,
    isPrivate: true
  },
  {
    id: 'start',
    path: '/start',
    component: () => <div>Start</div>,
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
    component: () => <Login/>,
    isPrivate: false
  },
  {
    id: 'signUp',
    path: '/sign_up',
    component: () => <Register/>,
    isPrivate: false
  }
]
