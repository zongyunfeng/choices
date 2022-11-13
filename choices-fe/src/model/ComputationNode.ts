import {Option} from "./Option";
import {StatefulOption} from "./StatefulOption";
import {EnumComputationOperationTypes} from "../utils/enums";

class ComputationNode {
    /**
     * the id of the corresponding tree node
     * @see OptionTreeNode#id for detail
     */
    nodeId: string;
    /**
     * the title of the item
     */
    title: string;
    /**
     * the directory of the item
     */
    directory: string;
    /**
     * the options of the item
     */
    options: Array<StatefulOption<Option>>;
    /**
     * the serialId of the computation node
     */
    serialId: string;
    /**
     * the serialId of the parent computation node
     */
    parentSerialId: string;
    /**
     * children computation nodes
     */
    children: Array<ComputationNode>;

    /**
     * indicate if a node is a container
     */
    isGroupContainerNode?: boolean = false;

    /**
     * indicate the operation between the children of the node
     */
    operation?: EnumComputationOperationTypes = EnumComputationOperationTypes.AND

    private constructor(data: ComputationNode) {
        this.nodeId = data.nodeId || '';
        this.title = data.title || '';
        this.directory = data.directory || '';
        this.options = data.options || [];
        this.serialId = data.serialId || '';
        this.parentSerialId = data.parentSerialId || '';
        this.children = data.children || [];
        this.isGroupContainerNode = data.isGroupContainerNode || false;
        this.operation = data.operation || EnumComputationOperationTypes.AND
    }

    public static create(nodeId: string,
                         title: string,
                         directory: string,
                         options: Array<StatefulOption<Option>>,
                         serialId: string,
                         parentSerialId: string,
                         children: Array<ComputationNode>,
                         isGroupContainerNode = false,
                         operation = EnumComputationOperationTypes.AND) {
        return new ComputationNode({
            nodeId, title, directory, options, serialId, parentSerialId, children, isGroupContainerNode, operation
        })
    }
}

export {ComputationNode}