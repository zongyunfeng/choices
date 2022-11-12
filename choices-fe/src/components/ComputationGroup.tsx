import React from "react";
import styles from './ComputationGroup.module.scss';
import ComputationCard from "./ComputationCard";
import {useComputationNode} from "../store/hooks";
import {Root_Computation_Node_SerialId} from "../utils/constants";

interface ComputationGroupProp {
    serialId: string
}

const ComputationGroup: React.FC<ComputationGroupProp> = ({serialId}) => {
    const computationNode = useComputationNode(serialId)

    return (
        <div className={styles.computation_group}>
            <div
                className={serialId !== Root_Computation_Node_SerialId ? styles.computation_group_children : undefined}>
                {
                    computationNode?.children.map(item => {
                        if (item.isGroupContainerNode) {
                            return <ComputationGroup serialId={item.serialId} key={item.serialId}/>
                        }
                        return <ComputationCard serialId={item.serialId} key={item.serialId}/>
                    })
                }
            </div>
        </div>
    );
}

export default React.memo(ComputationGroup);