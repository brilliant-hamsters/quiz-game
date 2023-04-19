import styles from "./Answer.module.scss"

type AnswerProps = {
    answer_number: number;
    answer_text: string;
}

export const Answer = (props:AnswerProps) => {

    return <div className={styles.root}>
                <div className={styles.answer}>
                    {props.answer_number}: {props.answer_text}
                </div>
           </div>
}
