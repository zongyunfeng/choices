import React from "react";
import styles from './ComputationGroup.module.scss';
import ComputationCard from "./ComputationCard";
import {useComputationNode} from "../store/hooks";
import {Root_Computation_Node_SerialId} from "../utils/constants";
import ComputationOperation from "./ComputationOperation";

interface ComputationGroupProp {
    /**
     * id of the corresponding computation node
     */
    serialId: string
}

const ComputationGroup: React.FC<ComputationGroupProp> = ({serialId}) => {
    const computationNode = useComputationNode(serialId)

    return (
        <div className={styles.computation_group}>
            <div
                className={serialId !== Root_Computation_Node_SerialId ? styles.computation_group_children : undefined}>
                {
                    computationNode?.children.map((item, index) => {
                        return <div key={item.serialId}>
                            <ComputationOperation
                                operation={item?.operation}
                                visible={Boolean(computationNode?.isGroupContainerNode && index % 2 === 1)}
                            />
                            {
                                item.isGroupContainerNode ?
                                    <ComputationGroup serialId={item.serialId} key={item.serialId}/>
                                    : <ComputationCard serialId={item.serialId} key={item.serialId}/>
                            }
                        </div>

                    })
                }
            </div>
        </div>
    );
}

export default React.memo(ComputationGroup);