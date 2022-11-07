import {
    CloseOutlined,
    FullscreenExitOutlined,
    FullscreenOutlined,
    HolderOutlined
} from "@ant-design/icons";
import styles from './ComputationGroup.module.scss'
import React, {useRef, useState} from "react";
import Selection from "./Selection";
import {useComputationDispatch, useComputationNode} from "../store/hooks";
import {useDrop} from "ahooks";
import {
    addComputationNode,
    removeComputationNode
} from "../store/computationSlice";
import {AddComputationNodePayload} from "../store/payload/AddComputationNodePayload";
import {fetchComputationItemById} from "../store/actions";
import {unwrapResult} from "@reduxjs/toolkit";
import {RemoveComputationNodePayload} from "../store/payload/RemoveComputationNodePayload";
import {Root_Computation_Node_SerialId} from "../utils/constants";

interface ComputationGroupProp {
    serialId: string;
}

const ComputationGroup: React.FC<ComputationGroupProp> = ({serialId}) => {
    const [collapse, setCollapse] = useState(false);

    const computationNode = useComputationNode(serialId);
    const selectedOptions = computationNode?.options?.filter(item => item.status) || [];
    const headers = selectedOptions.map(item => item.option?.title || '');
    const dropRef = useRef(null);
    const dispatch = useComputationDispatch();
    const addNewComputationNode = async (id: string, targetSerialId: string, parentSerialId: string) => {
        console.info('Group invoke')
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
            await addNewComputationNode(text, computationNode?.serialId || '', computationNode?.parentSerialId || '')
        },
        onDrop: (e) => {
            e?.stopPropagation();
            e?.preventDefault();
        }
    });

    const showContent = Boolean(computationNode && !computationNode.isGroupContainerNode)
    const showChildren = Boolean(computationNode?.children?.length && computationNode?.serialId !== Root_Computation_Node_SerialId)

    return (
        <div ref={dropRef}>
            {showContent &&
                <div className={styles.computation_group}>
                    <div className={styles.computation_group_header}>
                        <HolderOutlined/>
                        <div className={styles.computation_group_header_title}>
                            <span>{`${computationNode?.title || ''}=`}</span>
                            <span>{`${headers.join(',')}`}</span>
                        </div>
                        <div className={styles.computation_group_header_operations}>
                            <div onClick={() => {
                                setCollapse(!collapse)
                            }}>{collapse ? <FullscreenOutlined/> : <FullscreenExitOutlined/>}</div>
                            <div onClick={() => {
                                dispatch(removeComputationNode(RemoveComputationNodePayload.create(
                                    computationNode?.parentSerialId || '', serialId
                                )))
                            }}>
                                <CloseOutlined className={styles.computation_group_header_operations_close}/>
                            </div>
                        </div>
                    </div>

                    <div>
                        {
                            !collapse && < >
                                <span
                                    className={styles.computation_group_directory}>{computationNode?.directory || ''}</span>
                                <Selection serialId={serialId}/>
                            </>
                        }
                    </div>
                </div>
            }

            <div className={showChildren ? styles.computation_group_children : ''}>
                {
                    computationNode?.children?.map((item, index) => {
                        return <div>
                            {index % 2 === 1 && <div className={styles.computation_group_children_condition}>
                                <select className={styles.computation_group_children_condition_selector}>
                                    <option value={1} selected={true} className={styles.computation_group_children_condition_selector_option}>AND</option>
                                    <option value={0}>OR</option>
                                </select>
                            </div>}
                            <ComputationGroup serialId={item.serialId} key={item.serialId}/>
                        </div>
                    })
                }
            </div>
        </div>
    )

}

export default ComputationGroup;