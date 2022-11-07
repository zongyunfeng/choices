import {Checkbox} from "antd";
import {Option} from "../model/Option";
import React, {useState} from "react";
import styles from './ComputationOption.module.scss'
import {StatefulOption} from "../model/StatefulOption";

interface OptionProp {
    option: StatefulOption<Option>;
    onCheck: (checked: boolean, title: string) => void;
    isChecked?: boolean;
}

const ComputationOption: React.FC<OptionProp> = ({option, onCheck, isChecked}) => {
    return (
        <div className={styles.computation_option_container} >
            <Checkbox onChange={(event) => {
                onCheck(event.target.checked, option?.option?.title || '')
            }} checked={isChecked}>{option?.option?.title || ''}</Checkbox>
            <span>{option?.option?.count || 0}</span>
        </div>
    )
}

export default ComputationOption;