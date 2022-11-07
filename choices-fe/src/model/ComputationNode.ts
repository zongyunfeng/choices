import {Option} from "./Option";
import {StatefulOption} from "./StatefulOption";

class ComputationNode{
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
    serialId:string;
    /**
     * the serialId of the parent computation node
     */
    parentSerialId:string;
    /**
     * children computation nodes
     */
    children:Array<ComputationNode>;

    isGroupContainerNode?:boolean=false;

    constructor(data?:ComputationNode) {
        this.nodeId = data?.nodeId || '';
        this.title = data?.title || '';
        this.directory = data?.directory || '';
        this.options = data?.options || [];
        this.serialId=data?.serialId||'';
        this.parentSerialId=data?.parentSerialId||'';
        this.children=data?.children||[];
        this.isGroupContainerNode=data?.isGroupContainerNode||false;
    }
}

export {ComputationNode}