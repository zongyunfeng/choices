import {ComputationNode} from "../model/ComputationNode";

function visit(serialId: string, node: ComputationNode | undefined): ComputationNode | undefined {
    if (!node) {
        return undefined;
    }

    if (node.serialId === serialId) {
        return node;
    }

    const children = node.children || [];

    const targetNodes = children.map(item => {
        return visit(serialId, item)
    }).filter(Boolean)

    return targetNodes?.[0];
}

export {visit}