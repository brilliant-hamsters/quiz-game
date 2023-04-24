import emojiTop1 from '../../../../public/images/icons/emojiTop1.svg'
import emojiTop2 from '../../../../public/images/icons/emojiTop2.svg'
import emojiTop3 from '../../../../public/images/icons/emojiTop3.svg'
import style from './leaderBoardPedestal.module.scss'

export const LeaderBoardPedestal = () => {
  return (
    <div className={style.root}>
      <div className={style.columnElem}>
        <div>
          <img src={emojiTop3} alt="emojiTop3" />
        </div>
        <div className={style.columnFirst}></div>
      </div>
      <div className={style.columnElem}>
        <div>
          <img src={emojiTop1} alt="emojiTop1" />
        </div>
        <div className={style.columnSecond}></div>
      </div>
      <div className={style.columnElem}>
        <div>
          <img src={emojiTop2} alt="emojiTop2" />
        </div>
        <div className={style.columnThird}></div>
      </div>
    </div>
  )
}
