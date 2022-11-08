import {useRootComputationNode} from "../store/hooks";
import ComputationGroup from "./ComputationGroup";
import {Root_Computation_Node_SerialId} from "../utils/constants";

const DropZone=()=>{
    const computationNode = useRootComputationNode();
    const serialId = computationNode?.serialId || Root_Computation_Node_SerialId;

    return(
        <ComputationGroup serialId={serialId}/>
    )
}

export default DropZone