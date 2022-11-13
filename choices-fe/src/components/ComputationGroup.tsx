import React, {useCallback, useMemo} from "react";
import styles from './ComputationGroup.module.scss';
import ComputationCard from "./ComputationCard";
import {useComputationDispatch, useComputationNode} from "../store/hooks";
import {ComputationOptions, Root_Computation_Node_SerialId} from "../utils/constants";
import ComputationOperation, {ComputationOperationProp, Operation} from "./ComputationOperation";
import {changeComputationNodeOperation} from "../store/computationSlice";
import {ChangeComputationOperationPayload} from "../store/payload/ChangeComputationOperationPayload";

interface ComputationGroupProp {
    /**
     * id of the corresponding computation node
     */
    serialId: string
}

const ComputationGroup: React.FC<ComputationGroupProp> = ({serialId}) => {
    const computationNode = useComputationNode(serialId)
    const dispatch=useComputationDispatch()
    const computationOperations=useMemo(()=>{
        return ComputationOptions.map(item=>{
            return {
                title:item.title,
                value:item.value
            }as Operation
        })
    },[])

    const onOperationSelect:ComputationOperationProp['onSelect']=useCallback((value)=>{
        dispatch(changeComputationNodeOperation(ChangeComputationOperationPayload.create(value,serialId)))
    },[dispatch,serialId])

    return (
        <div className={styles.computation_group}>
            <div
                className={serialId !== Root_Computation_Node_SerialId ? styles.computation_group_children : undefined}>
                {
                    computationNode?.children.map((item, index) => {
                        return <div key={item.serialId}>
                            <ComputationOperation
                                options={computationOperations}
                                operation={item?.operation}
                                onSelect={onOperationSelect}
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