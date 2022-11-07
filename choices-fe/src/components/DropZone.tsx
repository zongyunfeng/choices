import {useRootComputationNode} from "../store/hooks";
import ComputationPanel from "./ComputationPanel";

const DropZone=()=>{
    const computationNode = useRootComputationNode();
    const serialId = computationNode?.serialId || '_RootNode';

    return(
        <ComputationPanel serialId={serialId}/>
    )
}

export default DropZone