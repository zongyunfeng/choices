import styles from './ComputationSelector.module.scss'
import {Button, Select} from "antd";
import React, {useCallback} from "react";
import OptionGroup, {OptionGroupProp} from "./common/checkbox/OptionGroup";
import {useComputationDispatch, useComputationNodeOptions} from "../store/hooks";
import {
    clearOptionsStatusForComputationNode,
    markOptionsForComputationNode,
    markOptionsStatusForComputationNode
} from "../store/computationSlice";
import {MarkNodeOptionsStatusPayload} from "../store/payload/MarkNodeOptionsStatusPayload";
import {MarkNodeOptionsPayload} from "../store/payload/MarkNodeOptionsPayload";

interface SelectionProp {
    serialId: string;
}

const ComputationSelector: React.FC<SelectionProp> = ({serialId}) => {
    const options = useComputationNodeOptions(serialId);
    const selectedOptions = options.filter(item => item.status);
    const dispatch = useComputationDispatch();
    const optionsForSelect = options.map(item => {
        return {
            label: item.option.title,
            value: item.option.title
        }
    })
    const groupOptions=options.map(item=>{
        return {
            label: item.option.title,
            value: item.option.id,
            labelColor:'#CCCCCC',
            tip:`${item.option.count}`,
            isChecked:item.status
        }
    })
    const onOptionStatusChange:OptionGroupProp['onChange'] = useCallback((checkedValues) => {
        dispatch(
            markOptionsForComputationNode(
                MarkNodeOptionsPayload.create(
                    checkedValues.map(item => item.toString()),
                    serialId,
                    true
                )
            )
        )
    }, [dispatch, serialId])

    const selectedOptionsForSelect = selectedOptions.map(item => item.option.title);
    return (
        <div className={styles.selection_container}>
            <div className={styles.selection_container_search}>
                <Select mode={`multiple`}
                        options={optionsForSelect}
                        value={selectedOptionsForSelect}
                        optionLabelProp={'label'}
                        optionFilterProp={'label'}
                        size={'middle'}
                        placeholder="Select an option"
                        style={{width: '200px'}}
                        onSelect={(title: string) => {
                            const item = options.find(op => op.option.title === title);
                            if (item) {
                                dispatch(markOptionsStatusForComputationNode(MarkNodeOptionsStatusPayload.create(
                                    item.option.id, serialId, !item.status
                                )))
                            }
                        }}
                        onDeselect={(title: string) => {
                            const item = options.find(op => op.option.title === title);
                            if (item) {
                                dispatch(markOptionsStatusForComputationNode(MarkNodeOptionsStatusPayload.create(
                                    item.option.id, serialId, !item.status
                                )))
                            }
                        }}
                />
            </div>

            <div className={styles.selection_container_operations}>
                <Button type="text" className={styles.selection_container_operations_clear} onClick={() => {
                    dispatch(clearOptionsStatusForComputationNode(serialId))
                }}>Clear All</Button>
                <span>{`${selectedOptions?.length || 0} Selected`}</span>
            </div>

            <OptionGroup options={groupOptions} onChange={onOptionStatusChange}/>

            <div className={styles.selection_container_footer}></div>
        </div>
    )
}

export default React.memo(ComputationSelector)