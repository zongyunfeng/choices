import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import type {RootState, AppDispatch} from './store'
import {visit} from "../utils/computationNodeVisitor";
import {StatefulOption} from "../model/StatefulOption";
import {Option} from "../model/Option";
import {ComputationNode} from "../model/ComputationNode";
import {Root_Computation_Node_SerialId} from "../utils/constants";

export const useComputationDispatch: () => AppDispatch = useDispatch
export const useComputationSelector: TypedUseSelectorHook<RootState> = useSelector

export const useComputationNode: (serialId: string) => ComputationNode | undefined = (serialId: string) => {
    const rootComputationNode = useComputationSelector((state) => state.computation.present.value)
    if (serialId === Root_Computation_Node_SerialId) {
        return rootComputationNode;
    }
    const targetComputationNode = visit(serialId, rootComputationNode);
    return targetComputationNode;
}

export const useRootComputationNode = () => {
    return useComputationNode(Root_Computation_Node_SerialId);
}

export const useComputationNodeOptions = (serialId: string) => {
    const targetComputationNode = useComputationNode(serialId);
    return targetComputationNode?.options || new Array<StatefulOption<Option>>();
}

export const useCanUndo=()=>{
    const past=useComputationSelector((state) => state.computation.past)
    return Boolean(past?.length)
}

export const useCanRedo=()=>{
    const future=useComputationSelector((state) => state.computation.future)
    return Boolean(future?.length)
}
