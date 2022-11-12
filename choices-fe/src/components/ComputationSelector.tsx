import styles from './ComputationSelector.module.scss'
import {Button} from "antd";
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
import {useWhyDidYouUpdate} from "ahooks";
import OptionSearcher from "./common/search/OptionSearcher";

interface SelectionProp {
    serialId: string;
}

const ComputationSelector: React.FC<SelectionProp> = ({serialId}) => {
    const options = useComputationNodeOptions(serialId);
    useWhyDidYouUpdate('ComputationSelector', {serialId, options})
    const selectedOptions = options.filter(item => item.status);
    const dispatch = useComputationDispatch();
    const optionsForSearch = options.map(item => {
        return {
            label: item.option.title,
            value: item.option.title,
            isChecked: item.status
        }
    })
    const groupOptions = options.map(item => {
        return {
            label: item.option.title,
            value: item.option.id,
            labelColor: '#CCCCCC',
            tip: `${item.option.count}`,
            isChecked: item.status
        }
    })
    const onOptionStatusChange: OptionGroupProp['onChange'] = useCallback((checkedValues) => {
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

    const onSelect = useCallback((title: string) => {
        const item = options.find(op => op.option.title === title);
        if (item) {
            dispatch(markOptionsStatusForComputationNode(MarkNodeOptionsStatusPayload.create(
                item.option.id, serialId, true
            )))
        }
    }, [dispatch, serialId])

    const onDeselect = useCallback((title: string) => {
        const item = options.find(op => op.option.title === title);
        if (item) {
            dispatch(markOptionsStatusForComputationNode(MarkNodeOptionsStatusPayload.create(
                item.option.id, serialId, false
            )))
        }
    }, [dispatch, serialId])

    const clearAllSelected = useCallback(() => {
        dispatch(clearOptionsStatusForComputationNode(serialId))
    }, [dispatch, serialId])

    return (
        <div className={styles.selection_container}>
            <OptionSearcher
                labelProp={'label'}
                filterProp={'label'}
                placeholder={'Search an option'}
                onSelect={onSelect}
                onDeselect={onDeselect}
                options={optionsForSearch}
                style={{
                    width: '240px',
                    borderRadius: '3px'
                }}
            />

            <div className={styles.selection_container_operations}>
                <Button type="text" className={styles.selection_container_operations_clear} onClick={clearAllSelected}>Clear
                    All</Button>
                <span>{`${selectedOptions?.length || 0} Selected`}</span>
            </div>

            <OptionGroup options={groupOptions} onChange={onOptionStatusChange}/>

            <div className={styles.selection_container_footer}></div>
        </div>
    )
}

export default React.memo(ComputationSelector)