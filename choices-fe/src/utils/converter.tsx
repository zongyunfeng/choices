import {OptionTreeNode} from "../model/OptionTreeNode";
import {DataNode} from "antd/lib/tree";
import {FolderFilled, TeamOutlined} from "@ant-design/icons";

function optionTreeDatas2DataNodes(optionTreeDatas: OptionTreeNode[] = []) {
    return optionTreeDatas.map(optionTreeData2DataNode);
}

function optionTreeData2DataNode(optionTreeData: OptionTreeNode): DataNode {
    const {id, title, children} = optionTreeData;
    return {
        key: id,
        title,
        children: children ? children?.map(optionTreeData2DataNode) : undefined,
        icon: getDataNodeIcon(optionTreeData)
    }
}

function getDataNodeIcon(optionTreeData: OptionTreeNode) {
    const {children, parent} = optionTreeData;
    if (parent && children?.length) {
        return <FolderFilled/>;
    } else if (parent) {
        return <TeamOutlined/>;
    } else {
        return undefined;
    }
}

export {optionTreeDatas2DataNodes, optionTreeData2DataNode}