import { FormEvent, useEffect, useState } from 'react'
import send from '../../../public/images/icons/send.svg'
import arrow from '../../../public/images/icons/arrow.svg'
import style from './forum.module.scss'
import { ForumThemesList } from '../../components/block/forumThemesList'
import { FormThemesMessages } from '../../components/block/formThemesMessages'
import { useAppDispatch, useAppSelector } from '../../store'
import {
  DataMessage,
  Message,
  MessagesList,
  ThemesList,
} from '../../typings/appTypes'
import {
  ComponentWithValidation,
  CustomComponentProps,
} from '../../utils/hoc/ComponentWithValidation'
import {
  createNewTheme,
  getMessageOfTheme,
  getThemesListData,
  sendNewMessage,
} from '../../store/forum/forumSlice'
import ModalWithForm from '../../components/ModalWithForm/ModalWithForm'
import { useNavigate } from 'react-router-dom'
export interface ForumProps extends CustomComponentProps {
  dataForm: DataMessage
}

function Forum({ validObj, onChange, dataForm, clearValue }: ForumProps) {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [activeTheme, setActiveTheme] = useState<number | null>(null)
  const [isOpenModal, toggleOpenModal] = useState<boolean>(false)
  const { user } = useAppSelector(state => state.auth)
  const themesList = useAppSelector<ThemesList>(state => state.forum.themesList)
  const messages = useAppSelector<MessagesList>(state => state.forum.messages)

  useEffect(() => {
    dispatch(getThemesListData())
  }, [])

  function changeCurrentTheme(themeId: number) {
    setActiveTheme(themeId)
    dispatch(getMessageOfTheme(themeId))
  }

  function submitMessage(evt: FormEvent) {
    evt.preventDefault()
    const message: Message = {
      author: user.first_name,
      themeId: activeTheme,
      message: dataForm.message,
      date: Date.now(),
    }
    dispatch(sendNewMessage(message))
    clearValue()
  }

  function createTheme(theme: string) {
    dispatch(createNewTheme({ theme: theme }))
    toggleDisplayModal()
    clearValue()
  }

  function toggleDisplayModal() {
    toggleOpenModal(!isOpenModal)
  }

  function goBack() {
    navigate(-1)
  }

  return (
    <section className={style.root}>
      <div className={style.left}>
        <h2 className={style.title}>Темы для обсуждения:</h2>
        <ul className={style.themes}>
          {themesList.length ? (
            themesList.map(item => (
              <ForumThemesList
                key={item.id}
                theme={item}
                active={item.id === activeTheme}
                onClick={changeCurrentTheme}
              />
            ))
          ) : (
            <li>Создайте новую тему</li>
          )}
        </ul>
        <button
          className={style.button}
          type="button"
          onClick={toggleDisplayModal}>
          Создать тему
        </button>
      </div>
      <div className={style.right}>
        <div className={style.gradient}></div>
        <div className={style.content}>
          {!activeTheme ? (
            <p>Выберите тему для просмотра сообщений</p>
          ) : messages.length ? (
            messages.map(item => (
              <FormThemesMessages
                key={item.id}
                message={item.message}
                nickName={item.author}
              />
            ))
          ) : (
            <p>Сообщений пока нет</p>
          )}
        </div>
        <form className={style.form} onSubmit={submitMessage}>
          <div className={style.wrapInput}>
            <input
              name="message"
              placeholder="Напишите ваше сообщение..."
              type="text"
              className={style.input}
              onChange={onChange}
              disabled={!activeTheme}
              value={dataForm.message}
            />
          </div>
          <button
            className={style.send}
            type="submit"
            disabled={!validObj.message?.valid}>
            <img src={send} alt="send" />
          </button>
        </form>
      </div>
      <div className={style.sidebar}>
        <div className={style.sidebarArrow} onClick={goBack}>
          <img src={arrow} alt="arrow" />
        </div>
        <div className={style.sidebarDivider}></div>
      </div>
      <ModalWithForm
        isOpen={isOpenModal}
        onSubmit={createTheme}
        onClose={toggleDisplayModal}
        title={'Введите название темы'}
        buttonName={'Создать тему'}
      />
    </section>
  )
}

export default ComponentWithValidation(Forum)
