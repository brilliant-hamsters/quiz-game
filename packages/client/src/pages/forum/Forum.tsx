import { FunctionComponent } from 'react'
import send from '../../../public/images/icons/send.svg'
import arrow from '../../../public/images/icons/arrow.svg'
import style from './forum.module.scss'
import { ForumThemesList } from '../../components/block/forumThemesList'
import { FormThemesMessages } from '../../components/block/formThemesMessages'

const arrThemesList = [
  {
    theme: 'Сделать более сложные вопросы',
    active: false,
  },
  {
    theme: 'Поменять дизайн',
    active: true,
  },
  {
    theme: 'Увеличить время на ответ',
    active: false,
  },
]
const arrMessages = [
  {
    nickName: 'Jiraf',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore dolor odit cupiditate omnis neque, odio voluptate similique, minima ducimus, non eveniet dolore quae impedit illo perferendis mollitia velit. Atque, deleniti!',

    your: false,
  },
  {
    nickName: 'Pharaoh',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore dolor odit cupiditate omnis neque, odio voluptate similique, minima ducimus, non eveniet dolore quae impedit illo perferendis mollitia velit. Atque, deleniti!',
    your: true,
  },
  {
    nickName: 'Face',
    message:
      'Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore dolor odit cupiditate omnis neque, odio voluptate similique, minima ducimus, non eveniet dolore quae impedit illo perferendis mollitia velit. Atque, deleniti!',
    your: false,
  },
]

export const Forum: FunctionComponent = () => {
  return (
    <section className={style.root}>
      <div className={style.left}>
        <h2 className={style.title}>Темы для обсуждения:</h2>
        <ul className={style.themes}>
          {arrThemesList.map(item => (
            <ForumThemesList
              key={item.theme}
              theme={item.theme}
              active={item.active}
            />
          ))}
        </ul>
        <button className={style.button}>Создать тему</button>
      </div>
      <div className={style.right}>
        <div className={style.gradient}></div>
        <div className={style.content}>
          {arrMessages.map(item => (
            <FormThemesMessages
              message={item.message}
              your={item.your}
              nickName={item.nickName}
            />
          ))}
        </div>
        <form className={style.form}>
          <div className={style.wrapInput}>
            <input
              placeholder="Напишите ваше сообщение..."
              type="text"
              className={style.input}
            />
          </div>
          <button className={style.send}>
            <img src={send} alt="send" />
          </button>
        </form>
      </div>
      <div className={style.sidebar}>
        <div className={style.sidebarArrow}>
          <img src={arrow} alt="arrow" />
        </div>
        <div className={style.sidebarDivider}></div>
      </div>
    </section>
  )
}
