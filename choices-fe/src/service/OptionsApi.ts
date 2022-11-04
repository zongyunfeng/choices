import {post} from "../utils/http";
import {OptionTreeNode} from "../model/OptionTreeNode";
import {GetComputationItemParam} from "./payload/GetComputationItemParam";
import {ComputationItem} from "../model/ComputationItem";

function getComputationTree() {
    return post<Array<OptionTreeNode>>('http://localhost:8080/computation/tree')
}

function getComputationItem(id: string) {
    return post<ComputationItem>('http://localhost:8080/computation/item', new GetComputationItemParam({id}))
}

export {getComputationTree,getComputationItem};