import {useRootComputationNode} from "../store/hooks";
import ComputationPanel from "./ComputationPanel";
import {Root_Computation_Node_SerialId} from "../utils/constants";

const DropZone=()=>{
    const computationNode = useRootComputationNode();
    const serialId = computationNode?.serialId || Root_Computation_Node_SerialId;

    return(
        <ComputationPanel serialId={serialId}/>
    )
}

export default DropZone