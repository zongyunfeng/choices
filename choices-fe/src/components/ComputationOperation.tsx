import styles from "./ComputationOperation.module.scss";
import {ComputationOptions} from "../utils/constants";
import React from "react";
import {EnumComputationOperationTypes} from "../utils/enums";

interface ComputationOperationProp {
    visible: boolean,
    operation?: EnumComputationOperationTypes
}

const ComputationOperation: React.FC<ComputationOperationProp> = ({visible, operation=EnumComputationOperationTypes.AND}) => {
    return (
        visible ?
            <div className={styles.computation_operation}>
                <select className={styles.computation_operation_selector}>
                    {
                        ComputationOptions.map((computationOption, index) => {
                            return <option
                                key={index}
                                value={computationOption.value}
                                selected={computationOption.value === operation}
                                className={styles.computation_operation_selector_option}>
                                {computationOption.title}
                            </option>
                        })
                    }
                </select>
            </div> : null
    )
}

export default React.memo(ComputationOperation)