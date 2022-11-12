import React, {useCallback, useRef} from "react";
import {useDrop} from "ahooks";
import styles from './ComputationPanel.module.scss';
import {useComputationDispatch, useRootComputationNode} from "../store/hooks";
import {addComputationNode} from "../store/computationSlice";
import {AddComputationNodePayload} from "../store/payload/AddComputationNodePayload";
import {fetchComputationItemById} from "../store/actions";
import {unwrapResult} from "@reduxjs/toolkit";
import {Root_Computation_Node_SerialId} from "../utils/constants";
import ComputationGroup from "./ComputationGroup";

interface ComputationPanelProp {
}

const ComputationPanel: React.FC<ComputationPanelProp> = ({}) => {

    const dropRef = useRef(null);
    const dispatch = useComputationDispatch();
    const computationNode=useRootComputationNode();

    const addNewComputationNode = useCallback(async (id: string, targetSerialId: string, parentSerialId: string) => {
        console.info('Panel invoke')
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
    },[])

    useDrop(dropRef, {
        onText: async (text, e) => {
            await addNewComputationNode(text, '', Root_Computation_Node_SerialId)
        },
    });

    return (
        <div className={styles.computation_panel}>
            <span className={styles.computation_panel_header}>Include members in these segments</span>
            <div className={styles.computation_panel_content} ref={dropRef}>
                {
                   computationNode?.children?.length? <ComputationGroup serialId={Root_Computation_Node_SerialId}/>:null
                }
            </div>
        </div>
    );
}

export default React.memo(ComputationPanel);