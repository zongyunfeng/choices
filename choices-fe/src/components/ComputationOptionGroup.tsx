import styles from "./ComputationSelector.module.scss";
import ComputationOption from "./ComputationOption";
import React from "react";
import {useComputationDispatch, useComputationNodeOptions} from "../store/hooks";
import {markOptionsStatusForComputationNode} from "../store/computationSlice";
import {MarkNodeOptionsStatusPayload} from "../store/payload/MarkNodeOptionsStatusPayload";
import {Empty} from "antd";

interface ComputationOptionGroupProp {
    serialId: string;
}

const ComputationOptionGroup: React.FC<ComputationOptionGroupProp> = ({serialId}) => {
    const options = useComputationNodeOptions(serialId);
    const dispatch = useComputationDispatch();

    if (!options?.length) {
        return (
            <Empty description={`No options available!`}/>
        );
    }
    return (
        <div className={styles.selection_container_options}>
            {
                options.map(item => {
                    return <ComputationOption option={item} isChecked={item.status} key={`${item.option.id}`} onCheck={(checked, title) => {
                        dispatch(markOptionsStatusForComputationNode(MarkNodeOptionsStatusPayload.create(
                            item.option.id,serialId,checked
                        )))
                    }
                    }/>
                })
            }
        </div>
    )
}

export default ComputationOptionGroup;