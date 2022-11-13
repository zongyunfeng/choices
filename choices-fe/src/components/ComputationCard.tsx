import styles from './ComputationCard.module.scss'
import React, {useCallback, useRef, useState} from "react";
import ComputationSelector from "./ComputationSelector";
import {useComputationDispatch, useComputationNode} from "../store/hooks";
import {useDrop} from "ahooks";
import {
    addComputationNode, removeComputationNode,
} from "../store/computationSlice";
import {AddComputationNodePayload} from "../store/payload/AddComputationNodePayload";
import {fetchComputationItemById} from "../store/actions";
import {unwrapResult} from "@reduxjs/toolkit";
import CollapsableCard from "./common/collapsable/CollapsableCard";
import HighlightContainer from "./common/container/HighlightContainer";
import {RemoveComputationNodePayload} from "../store/payload/RemoveComputationNodePayload";

interface ComputationGroupProp {
    /**
     * id of the corresponding computation node
     */
    serialId: string;
}

const ComputationCard: React.FC<ComputationGroupProp> = ({serialId}) => {
    const [isHovering, setIsHovering] = useState(false);

    const computationNode = useComputationNode(serialId);
    const selectedOptions = computationNode?.options?.filter(item => item.status) || [];
    const headers = selectedOptions.map(item => item.option?.title || '');
    const dropRef = useRef(null);
    const dispatch = useComputationDispatch();

    const addNewComputationNodeById = useCallback(async (id: string, targetSerialId: string, parentSerialId: string) => {
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
    }, [dispatch])

    const removeComputationNodeById=useCallback(() => {
        dispatch(removeComputationNode(RemoveComputationNodePayload.create(
            computationNode?.parentSerialId || '', serialId
        )))
    },[dispatch])

    useDrop(dropRef, {
        onText: async (text, e) => {
            setIsHovering(false);
            await addNewComputationNodeById(text, computationNode?.serialId || '', computationNode?.parentSerialId || '')
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

    const headerContent = (
        <div className={styles.computation_card_header_title}>
            <span>{`${computationNode?.title || ''}`}</span>
            <span
                className={styles.computation_card_header_title_options}>{headers?.length ? `=${headers.join(',')}` : ''}</span>
        </div>
    )

    return (
        <div ref={dropRef}>
            <HighlightContainer isHighlight={isHovering} highlightStyle={{
                    border: 'solid',
                    borderColor: "green",
                    borderWidth: '3px',
                    borderRadius: '10px 10px 2px 2px'
                }}>
                <CollapsableCard headerContent={headerContent} style={{borderRadius: '10px 10px 2px 2px'}} onClose={removeComputationNodeById}>
                    <span className={styles.computation_card_directory}>{computationNode?.directory || ''}</span>
                    <ComputationSelector serialId={serialId}/>
                </CollapsableCard>
            </HighlightContainer>
        </div>
    )

}

export default ComputationCard;