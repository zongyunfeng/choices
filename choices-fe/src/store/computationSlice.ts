import type {PayloadAction} from '@reduxjs/toolkit'
import {createSlice, nanoid} from '@reduxjs/toolkit'
import {ComputationNode} from "../model/ComputationNode";
import {AddComputationNodePayload} from "./payload/AddComputationNodePayload";
import {StatefulOption} from "../model/StatefulOption";
import {visit} from "../utils/computationNodeVisitor";
import {MarkNodeOptionsStatusPayload} from "./payload/MarkNodeOptionsStatusPayload";
import * as _ from 'lodash'
import {RemoveComputationNodePayload} from "./payload/RemoveComputationNodePayload";
import {Root_Computation_Node_SerialId} from "../utils/constants";
import {message} from "antd";
import {EnumComputationOperationTypes} from "../utils/enums";
import {MarkNodeOptionsPayload} from "./payload/MarkNodeOptionsPayload";
import {ChangeComputationOperationPayload} from "./payload/ChangeComputationOperationPayload";

export interface ComputationState {
    value: ComputationNode
}

const rootNode = ComputationNode.create(
    '',
    '',
    '',
    [],
    Root_Computation_Node_SerialId,
    '',
    [],
    true,
    EnumComputationOperationTypes.None
)

const initialState: ComputationState = {
    value: rootNode,
}

export const computationSlice = createSlice({
    name: 'computation',
    initialState,
    reducers: {
        addComputationNode: (state, action: PayloadAction<AddComputationNodePayload>) => {
            const newState = _.cloneDeep<ComputationState>(state)
            const data = action.payload.item
            const options = data.options.map(item => StatefulOption.create(item))
            const nodeId = data.nodeId;
            const {parentSerialId, targetSerialId} = action.payload
            const newNode = ComputationNode.create(
                data.nodeId,
                data.title,
                data.directory,
                options,
                nanoid(),
                parentSerialId,
                [],
            );

            const parent = visit(parentSerialId, newState.value)

            // only in two circumstances we get the root as parent
            // 1. there is no actual computation added
            // 2. we drop an item to one of root's children and there is at most 1 computation added
            if (parent === newState.value && parent.children.length < 2) {
                // restrict only two computation at the root
                if (parent.children?.length >= 2) {
                    message.error('Only support add to node to the root!')
                    return state;
                }
                // check if we have added same computation node in the same group
                const hasAdded = parent?.children.find(item => item.nodeId === nodeId)
                if (hasAdded) {
                    message.error('Please select a different node for computation!')
                    return state;
                }

                parent.children.push(newNode)
                return newState;
            }

            if (parent) {
                const targetIndex = parent.children.findIndex(item => item.serialId === targetSerialId)
                if (targetIndex !== -1) {
                    const targetNode = parent.children[targetIndex]

                    // restrict only two computation in the same group
                    if (targetNode.nodeId === nodeId) {
                        message.error('Please select a different node for computation!')
                        return state;
                    }
                    const groupSerialId = nanoid();
                    if (targetNode) {
                        targetNode.parentSerialId = groupSerialId
                        newNode.parentSerialId = groupSerialId
                        // create a new container node to contain the two node and insert it
                        const group = ComputationNode.create(
                            '',
                            '',
                            '',
                            [],
                            groupSerialId,
                            parent.serialId,
                            [targetNode, newNode],
                            true,
                            EnumComputationOperationTypes.AND
                        )
                        parent.children[targetIndex] = group
                    }
                }
            }
            return newState
        },
        removeComputationNode: (state, action: PayloadAction<RemoveComputationNodePayload>) => {
            const newState = _.cloneDeep<ComputationState>(state)
            const {parentSerialId,targetSerialId} = action.payload;
            // get the parent node
            const parentNode = visit(parentSerialId, newState.value)
            // get the siblings
            const others = parentNode?.children?.filter(item => item.serialId !== targetSerialId) || [];
            if (parentNode) {
                // get the grandparent node
                const upperNode = visit(parentNode.parentSerialId, newState.value)
                if (upperNode) {
                    const parentIndex = upperNode?.children?.findIndex(item => item.serialId === parentNode.serialId);
                    // remove parent node and add siblings to the grandparent node
                    if (parentIndex !== -1) {
                        const left = _.slice(upperNode?.children, 0, parentIndex)
                        const right = _.slice(upperNode?.children, parentIndex + 1)
                        const otherNodes = others.map(node => {
                            node.parentSerialId = upperNode.serialId
                            return node
                        })
                        upperNode.children = [...left, ...otherNodes, ...right]
                    }
                } else {
                    // parent node is the root node
                    parentNode.children = others
                    parentNode.operation = EnumComputationOperationTypes.None
                }
            }
            return newState
        },
        clearOptionsStatusForComputationNode: (state, action: PayloadAction<string>) => {
            const newState = _.cloneDeep<ComputationState>(state)
            const target = visit(action.payload, newState.value)
            if (target) {
                target.options = target.options.map(item => StatefulOption.create(item.option, false))
            }
            return newState
        },
        markOptionsStatusForComputationNode: (state, action: PayloadAction<MarkNodeOptionsStatusPayload>) => {
            const newState = _.cloneDeep<ComputationState>(state)
            const {serialId,status,id} = action.payload;
            const target = visit(serialId, newState.value)
            // find the target computation node and mark the specified option
            if (target) {
                const targetOptionIndex = target.options.findIndex(item => item.option.id === id)
                const targetOption = target.options?.[targetOptionIndex]
                if (targetOption) {
                    targetOption.status = status
                    target.options[targetOptionIndex] = StatefulOption.create(targetOption.option, targetOption.status)
                }
                return newState
            }
        },
        markOptionsForComputationNode: (state, action: PayloadAction<MarkNodeOptionsPayload>) => {
            const newState = _.cloneDeep<ComputationState>(state)
            const serialId = action.payload.serialId;
            const target = visit(serialId, newState.value)
            if (target) {
                // batch mark options
                const newOptions = target.options.map(item => {
                    item.status = action.payload.ids.includes(item.option.id);
                    return item;
                })

                target.options = newOptions
                return newState
            }
        },
        changeComputationNodeOperation: (state, action: PayloadAction<ChangeComputationOperationPayload>) => {
            const newState = _.cloneDeep<ComputationState>(state)
            const {operation,targetSerialId}=action.payload
            const target = visit(targetSerialId, newState.value)
            console.info({target})
            console.info({operation})
            if(target){
                target.operation=operation
                return newState
            }
        }
    }
})

export const {
    addComputationNode,
    removeComputationNode,
    clearOptionsStatusForComputationNode,
    markOptionsStatusForComputationNode,
    markOptionsForComputationNode,
    changeComputationNodeOperation
} = computationSlice.actions

export default computationSlice.reducer