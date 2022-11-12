import styles from "./OptionGroup.module.scss";
import ComputationOption from "./Option";
import React from "react";
import {Checkbox, Empty} from "antd";
import {CheckboxValueType} from "antd/es/checkbox/Group";

export interface GroupOption{
    label:string;
    value:string;
    labelColor?:string;
    tip?:string;
    isChecked?: boolean;
}

export interface OptionGroupProp {
    options:Array<GroupOption>
    onChange:(checkedValues: Array<CheckboxValueType>) =>void
}

const OptionGroup: React.FC<OptionGroupProp> = ({options,onChange}) => {
    if (!options?.length) {
        return (
            <Empty description={`No options available!`}/>
        );
    }

    return (
        <Checkbox.Group onChange={onChange} className={styles.options}>
                {
                    options.map(item => {
                        return <ComputationOption
                            label={item.label}
                            value={item.value}
                            labelColor={item.labelColor}
                            tip={item.tip}
                            isChecked={item.isChecked}
                            key={item.value}/>
                    })
                }
        </Checkbox.Group>
    )
}

export default React.memo(OptionGroup);