import styles from './Selection.module.scss'
import {SearchOutlined} from "@ant-design/icons";
import {Button, Input, Select} from "antd";
import React from "react";
import ComputationOptionGroup from "./ComputationOptionGroup";
import {useComputationDispatch, useComputationNode, useComputationNodeOptions} from "../store/hooks";
import {clearOptionsStatusForComputationNode, markOptionsStatusForComputationNode} from "../store/computationSlice";
import {MarkNodeOptionsStatusPayload} from "../store/payload/MarkNodeOptionsStatusPayload";

interface SelectionProp {
    serialId: string;
    onCheck: (checked: boolean, title: string) => void;
}

const Selection: React.FC<SelectionProp> = ({serialId, onCheck}) => {
    const options = useComputationNodeOptions(serialId);
    const selectedOptions = options.filter(item => item.status);
    const dispatch = useComputationDispatch();
    const optionsForSelect = options.map(item => {
        return {
            label: item.option.title,
            value: item.option.title
        }
    })
    const selectedOptionsForSelect=selectedOptions.map(item=>item.option.title);
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
                        onSelect={(title:string)=>{
                            const item=options.find(op=>op.option.title===title);
                            if(item){
                                dispatch(markOptionsStatusForComputationNode(MarkNodeOptionsStatusPayload.create(
                                    item.option.id,serialId,!item.status
                                )))
                            }
                        }}
                        onDeselect={(title:string)=>{
                            const item=options.find(op=>op.option.title===title);
                            if(item){
                                dispatch(markOptionsStatusForComputationNode(MarkNodeOptionsStatusPayload.create(
                                    item.option.id,serialId,!item.status
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

            <ComputationOptionGroup serialId={serialId}/>
        </div>
    )
}

export default Selection