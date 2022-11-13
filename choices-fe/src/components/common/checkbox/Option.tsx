import {Checkbox} from "antd";
import React from "react";
import styles from './Option.module.scss'

interface OptionProp {
    /**
     * label for the checkbox
     */
    label:string;
    /**
     * value for the checkbox
     */
    value:string;
    /**
     * color for the label
     */
    labelColor?:string;
    /**
     * color for the tip
     */
    tipColor?:string;
    /**
     * optional tip for the label
     */
    tip?:string;
    /**
     * check status
     */
    isChecked: boolean;
}

const Option: React.FC<OptionProp> = ({label,value,labelColor,tipColor, tip, isChecked}) => {
    return (
        <div className={styles.option_container} >
            <Checkbox checked={isChecked} style={{color:labelColor}} value={value}>{label}</Checkbox>
            <span style={{color:tipColor}}>{tip}</span>
        </div>
    )
}

export default React.memo(Option);