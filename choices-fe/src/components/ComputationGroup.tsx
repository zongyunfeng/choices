import React, {useRef} from "react";
import {useDrop} from "ahooks";
import styles from './ComputationGroup.module.scss';
import ComputationCard from "./ComputationCard";
import {useComputationDispatch, useComputationNode} from "../store/hooks";
import {addComputationNode} from "../store/computationSlice";
import {AddComputationNodePayload} from "../store/payload/AddComputationNodePayload";
import {fetchComputationItemById} from "../store/actions";
import {unwrapResult} from "@reduxjs/toolkit";
import {Root_Computation_Node_SerialId} from "../utils/constants";

interface ComputationPanelProp {
}

const ComputationGroup: React.FC<ComputationPanelProp> = ({}) => {

    const dropRef = useRef(null);
    const dispatch = useComputationDispatch();


    const addNewComputationNode = async (id: string, targetSerialId: string, parentSerialId: string) => {
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
    }
    useDrop(dropRef, {
        onText: async (text, e) => {
            await addNewComputationNode(text, '', Root_Computation_Node_SerialId)
        },
    });

    return (
        <div className={styles.computation_container}>
            <div className={styles.computation_container_group} ref={dropRef}>
                {
                    <ComputationCard serialId={Root_Computation_Node_SerialId}/>
                }
            </div>
        </div>
    );
}

export default ComputationGroup;