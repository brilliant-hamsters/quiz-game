import styles from "./block_answer.module.scss"

type answer = {
    answer_number: string;
    answer_text: string;
}

export const Answer = (props:answer) => {

    return <div className={styles.answer}>
                <p className={styles.answer__p}>
                    {props.answer_number}: {props.answer_text}
                </p>
           </div>
}
