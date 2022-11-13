import React, {useCallback, useRef} from "react";
import {useDrop} from "ahooks";
import styles from './ComputationPanel.module.scss';
import {useCanRedo, useCanUndo, useComputationDispatch, useRootComputationNode} from "../store/hooks";
import {addComputationNode} from "../store/computationSlice";
import {AddComputationNodePayload} from "../store/payload/AddComputationNodePayload";
import {fetchComputationItemById} from "../store/actions";
import {unwrapResult} from "@reduxjs/toolkit";
import {Root_Computation_Node_SerialId} from "../utils/constants";
import ComputationGroup from "./ComputationGroup";
import {Button} from "antd";
import {ActionCreators as UndoActionCreators} from 'redux-undo'
import {DoubleLeftOutlined, DoubleRightOutlined} from "@ant-design/icons";

interface ComputationPanelProp {
}

const ComputationPanel: React.FC<ComputationPanelProp> = ({}) => {

    const dropRef = useRef(null);
    const dispatch = useComputationDispatch();
    const computationNode = useRootComputationNode();

    const addNewComputationNode = useCallback(async (id: string, targetSerialId: string, parentSerialId: string) => {
        const resultAction = await dispatch(fetchComputationItemById(id))
        const item = unwrapResult(resultAction)
        if (item) {
            await dispatch(
                addComputationNode(
                    AddComputationNodePayload.create(
                        parentSerialId, targetSerialId, item
                    )
                )
            )
        }
    }, [])

    const undo = useCallback(() => {
        dispatch(UndoActionCreators.undo())
    }, [dispatch])

    const redo = useCallback(() => {
        dispatch(UndoActionCreators.redo())
    }, [dispatch])

    useDrop(dropRef, {
        onText: async (text, e) => {
            await addNewComputationNode(text, '', Root_Computation_Node_SerialId)
        },
    });

    const canUndo=useCanUndo()
    const canRedo=useCanRedo()

    return (
        <div className={styles.computation_panel}>
            <div className={styles.computation_panel_header}>
                <span>Include members in these segments</span>
                <div className={styles.computation_panel_operations}>
                    <Button onClick={undo} icon={<DoubleLeftOutlined/>} type={'link'} disabled={!canUndo}>Undo</Button>
                    <Button onClick={redo} icon={<DoubleRightOutlined/>} type={'link'} disabled={!canRedo}>Redo</Button>
                </div>
            </div>

            <div className={styles.computation_panel_content} ref={dropRef}>
                {
                    computationNode?.children?.length ?
                        <ComputationGroup serialId={Root_Computation_Node_SerialId}/> : null
                }
            </div>
        </div>
    );
}

export default React.memo(ComputationPanel);