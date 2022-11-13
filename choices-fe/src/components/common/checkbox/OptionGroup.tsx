import styles from "./OptionGroup.module.scss";
import Option from "./Option";
import React from "react";
import {Checkbox, Empty} from "antd";
import {CheckboxValueType} from "antd/es/checkbox/Group";

export interface GroupOption{
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
    isChecked?: boolean;
}

export interface OptionGroupProp {
    /**
     * the options available
     * @see GroupOption for detail
     */
    options:Array<GroupOption>
    /**
     * the onSelect callback
     */
    onChange:(checkedValues: Array<CheckboxValueType>) =>void
}

const OptionGroup: React.FC<OptionGroupProp> = ({options,onChange}) => {
    if (!options?.length) {
        return (
            <Empty description={`No options available!`}/>
        );
    }

    const selected=options.filter(item=>item.isChecked).map(item=>item.value)

    return (
        <Checkbox.Group onChange={onChange} className={styles.options} value={selected}>
                {
                    options.map((item,index) => {
                        return <Option
                            label={item.label}
                            value={item.value}
                            labelColor={item.labelColor}
                            tip={item.tip}
                            isChecked={Boolean(item.isChecked)}
                            key={item.value}/>
                    })
                }
        </Checkbox.Group>
    )
}

export default React.memo(OptionGroup);