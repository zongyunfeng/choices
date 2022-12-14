import {Spin, Tree, TreeProps} from "antd";
import {DataNode} from "antd/lib/tree";
import {
    DownOutlined
} from '@ant-design/icons';
import {optionTreeDataArr2DataNodes} from "../utils/converter";
import React, {useEffect, useState} from "react";
import {useRequest} from "ahooks";
import {getComputationTree} from "../service/OptionsApi";
import styles from './OptionsTree.module.scss'

const OptionsTree=()=> {
    const onSelect: TreeProps['onSelect'] = (selectedKeys, info) => {
        console.log('selected', selectedKeys, info);
    };

    const onDragStart: TreeProps['onDragStart'] = info => {
        info.event.dataTransfer.setData('opt', `${info.node.key}`)
    };

    const {data,error,loading}=useRequest(getComputationTree);
    const [treeData,setTreeData]=useState<Array<DataNode>>([]);
    useEffect(()=>{
        const dataNodes=optionTreeDataArr2DataNodes(data?.data?.data||[]);
        setTreeData(dataNodes);
    },[data?.data?.data])

    if(loading){
        return <Spin size={'large'}/>
    }

    return (
        <div className={styles.options_tree_container}>
            <div className={styles.options_tree_container_header}>
                <span>Name</span>
                <span>Size</span>
            </div>
            <div >
                <Tree
                    onDragStart={onDragStart}
                    draggable={(nodeData: DataNode) => {
                        return !Boolean(nodeData?.children?.length)
                    }}
                    showIcon={true}
                    onSelect={onSelect}
                    switcherIcon={<DownOutlined/>}
                    treeData={treeData}
                />
            </div>
        </div>
    )
}

export default React.memo(OptionsTree);