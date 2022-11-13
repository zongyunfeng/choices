import styles from "./ComputationOperation.module.scss";
import React, {useCallback, useState} from "react";
import {EnumComputationOperationTypes} from "../utils/enums";
import {Select} from "antd";

export interface Operation {
    title: string;
    value: EnumComputationOperationTypes
}

export interface ComputationOperationProp {
    /**
     * should show the operation
     */
    visible: boolean,
    /**
     * selected operation
     * @see EnumComputationOperationTypes for details
     */
    operation?: EnumComputationOperationTypes
    /**
     * onSelect callback
     */
    onSelect: (value: EnumComputationOperationTypes) => void

    options: Array<Operation>
}

const ComputationOperation: React.FC<ComputationOperationProp> = ({
                                                                      visible,
                                                                      operation = EnumComputationOperationTypes.AND,
                                                                      options,
                                                                      onSelect
                                                                  }) => {
    const [selected, setSelected] = useState(operation)
    const selectOptions = options.map(item => {
        return {
            label: item.title,
            value: item.value
        }
    })

    const onSelectedCallback = useCallback((value: EnumComputationOperationTypes) => {
        setSelected(value);
        onSelect(value)
    }, [onSelect])

    return (
        visible ?
            <div className={styles.computation_operation}>
                <Select options={selectOptions} value={selected} onSelect={onSelectedCallback}/>
            </div> : null
    )
}

export default React.memo(ComputationOperation)