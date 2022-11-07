import {ComputationNode} from "../model/ComputationNode";

function visit(serialId: string, node: ComputationNode | undefined): ComputationNode | undefined {
    if (!node) {
        return undefined;
    }

    if (node.serialId === serialId) {
        return node;
    }

    const children = node.children;

    const left = visit(serialId, children?.[0]);
    const right = visit(serialId, children?.[1]);

    return left||right;

}

export {visit}