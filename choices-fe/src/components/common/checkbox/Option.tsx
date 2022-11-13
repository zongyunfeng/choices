import {Checkbox} from "antd";
import React from "react";
import styles from './Option.module.scss'

interface OptionProp {
    label:string;
    value:string;
    labelColor?:string;
    tip?:string;
    isChecked: boolean;
}

const Option: React.FC<OptionProp> = ({label,value,labelColor, tip, isChecked}) => {
    return (
        <div className={styles.option_container} >
            <Checkbox checked={isChecked} style={{color:labelColor}} value={value}>{label}</Checkbox>
            <span>{tip}</span>
        </div>
    )
}

export default React.memo(Option);