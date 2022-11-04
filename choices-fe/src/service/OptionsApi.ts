import {get, post} from "../utils/http";
import {OptionTreeNode} from "../model/OptionTreeNode";

function getOptionTree() {
    return post<Array<OptionTreeNode>>('http://localhost:8080/options/tree')
}

export {getOptionTree};