import React, { FC } from "react";
import styles from "./Toggler.module.scss"

type TogglerProps = {
    value: boolean,
    onChange: () => void,
}

export const Toggler: FC<TogglerProps> = ({value, onChange}) => {
    return (
        <label className={styles.root}>
            <input 
                id="toggler"
                type="checkbox" 
                onClick={onChange}    
                checked={value}
                readOnly
            />
            <span className={styles.slider} />
            <span className={styles.wave} />
        </label>
    )
}
