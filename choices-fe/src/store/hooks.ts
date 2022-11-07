import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux'
import type {RootState, AppDispatch} from './store'
import {visit} from "../utils/computationNodeVisitor";
import {StatefulOption} from "../model/StatefulOption";
import {Option} from "../model/Option";
import {ComputationNode} from "../model/ComputationNode";

export const useComputationDispatch: () => AppDispatch = useDispatch
export const useComputationSelector: TypedUseSelectorHook<RootState> = useSelector

export const useComputationNode: (serialId: string) => ComputationNode | undefined = (serialId: string) => {
    const rootComputationNode = useComputationSelector((state) => state.computation.value)
    if (serialId === '_RootNode') {
        return rootComputationNode;
    }
    const targetComputationNode = visit(serialId, rootComputationNode);
    return targetComputationNode;
}

export const useRootComputationNode = () => {
    return useComputationNode('_RootNode');
}

export const useComputationNodeOptions = (serialId: string) => {
    const targetComputationNode = useComputationNode(serialId);
    return targetComputationNode?.options || new Array<StatefulOption<Option>>();
}

export const useComputationItem=(id:string)=>{
    const computationItems=useComputationSelector((state)=>state.computationItem.value)
    const target=computationItems.find(item=>item.nodeId===id)
    return target
}