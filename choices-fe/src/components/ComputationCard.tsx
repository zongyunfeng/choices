import {
    CloseOutlined,
    FullscreenExitOutlined,
    FullscreenOutlined,
    HolderOutlined
} from "@ant-design/icons";
import styles from './ComputationCard.module.scss'
import React, {useRef, useState} from "react";
import ComputationSelector from "./ComputationSelector";
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
import {ComputationOptions, Root_Computation_Node_SerialId} from "../utils/constants";
import FadeInOut from "./FadeInOut/FadeInOut";

interface ComputationGroupProp {
    serialId: string;
}

const ComputationCard: React.FC<ComputationGroupProp> = ({serialId}) => {
    const [collapse, setCollapse] = useState(false);
    const [isHovering, setIsHovering] = useState(false);

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
            setIsHovering(false);
            await addNewComputationNode(text, computationNode?.serialId || '', computationNode?.parentSerialId || '')
        },
        onDrop: (e) => {
            e?.stopPropagation();
            setIsHovering(false);
        },
        onDragEnter: () => {
            setIsHovering(true);
        },
        onDragLeave: () => {
            setIsHovering(false);
        }
    });

    const showContent = Boolean(computationNode && !computationNode.isGroupContainerNode)
    const showChildren = Boolean(computationNode?.children?.length && computationNode?.serialId !== Root_Computation_Node_SerialId)

    return (
        <div ref={dropRef}>
            {showContent &&
                <div className={styles.computation_card} style={
                    isHovering ? {
                        borderColor: "green",
                        borderWidth: '3px'
                    } : undefined}>
                    <div className={styles.computation_card_header}>
                        <HolderOutlined/>
                        <div className={styles.computation_card_header_title}>
                            <span>{`${computationNode?.title || ''}=`}</span>
                            <span>{`${headers.join(',')}`}</span>
                        </div>
                        <div className={styles.computation_card_header_operations}>
                            <div onClick={() => {
                                setCollapse(!collapse)
                            }}>{collapse ? <FullscreenOutlined/> : <FullscreenExitOutlined/>}</div>
                            <div onClick={() => {
                                dispatch(removeComputationNode(RemoveComputationNodePayload.create(
                                    computationNode?.parentSerialId || '', serialId
                                )))
                            }}>
                                <CloseOutlined className={styles.computation_card_header_operations_close}/>
                            </div>
                        </div>
                    </div>

                    <div>
                        <FadeInOut show={!collapse}>
                            <span
                                className={styles.computation_card_directory}>{computationNode?.directory || ''}</span>
                            <ComputationSelector serialId={serialId}/>
                        </FadeInOut>
                    </div>
                </div>
            }

            <div className={showChildren ? styles.computation_card_children : ''}>
                {
                    computationNode?.children?.map((item, index) => {
                        return <div>
                            {computationNode?.isGroupContainerNode && index % 2 === 1 &&
                                <div className={styles.computation_card_children_condition}>
                                    <select className={styles.computation_card_children_condition_selector}>
                                        {
                                            ComputationOptions.map(computationOption => {
                                                return <option value={computationOption.value}
                                                               selected={computationOption.value === computationNode?.operation}
                                                               className={styles.computation_card_children_condition_selector_option}>
                                                    {computationOption.title}
                                                </option>
                                            })
                                        }
                                    </select>
                                </div>}
                            <ComputationCard serialId={item.serialId} key={item.serialId}/>
                        </div>
                    })
                }
            </div>
        </div>
    )

}

export default ComputationCard;