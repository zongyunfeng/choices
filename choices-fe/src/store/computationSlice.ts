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

export interface ComputationState {
    value: ComputationNode
}

const rootNode = new ComputationNode(
    {
        nodeId: '',
        title: '',
        directory: '',
        options: [],
        serialId: Root_Computation_Node_SerialId,
        parentSerialId: '',
        children: [],
        isGroupContainerNode: true,
        operation:EnumComputationOperationTypes.None
    })

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
            const newNode = new ComputationNode({
                nodeId: data.nodeId,
                title: data.title,
                directory: data.directory,
                options,
                serialId: nanoid(),
                parentSerialId: action.payload.parentSerialId,
                children: [],
            });

            const parent = visit(action.payload.parentSerialId, newState.value)

            if (parent === newState.value) {

                const hasAdded = parent?.children.find(item => item.nodeId === action.payload.item.nodeId)
                if (hasAdded) {
                    message.error('Please select a different node for computation!')
                    return state;
                }

                if (!Boolean(action.payload.targetSerialId)) {
                    console.info({parent})
                    parent?.children?.push(newNode)
                    return newState
                }
            }

            if (parent) {
                const targetIndex = parent.children.findIndex(item => item.serialId === action.payload.targetSerialId)
                if (targetIndex !== -1) {
                    const targetNode = parent.children[targetIndex]

                    if (targetNode.nodeId === action.payload.item.nodeId) {
                        message.error('Please select a different node for computation!')
                        return state;
                    }
                    const groupSerialId = nanoid();
                    if (targetNode) {
                        targetNode.parentSerialId = groupSerialId
                        newNode.parentSerialId = groupSerialId
                        const group = new ComputationNode({
                            nodeId: '',
                            title: '',
                            directory: '',
                            options: [],
                            serialId: groupSerialId,
                            parentSerialId: parent.serialId,
                            children: [targetNode, newNode],
                            isGroupContainerNode: true,
                            operation: EnumComputationOperationTypes.AND
                        })
                        parent.children[targetIndex] = group
                    }
                }
            }
            return newState
        },
        removeComputationNode: (state, action: PayloadAction<RemoveComputationNodePayload>) => {
            const newState = _.cloneDeep<ComputationState>(state)
            const parentNode = visit(action.payload.parentSerialId, newState.value)
            const others = parentNode?.children?.filter(item => item.serialId !== action.payload.targetSerialId) || [];
            if (parentNode) {
                const upperNode = visit(parentNode.parentSerialId, newState.value)
                if (upperNode) {
                    const parentIndex = upperNode?.children?.findIndex(item => item.serialId === parentNode.serialId);
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
            const target = visit(action.payload.serialId, newState.value)
            console.info({target})
            if (target) {
                const targetOptionIndex = target.options.findIndex(item => item.option.id === action.payload.id)
                console.info({targetOptionIndex})
                const targetOption = target.options?.[targetOptionIndex]
                console.info({targetOption})
                if (targetOption) {
                    targetOption.status = action.payload.status
                    target.options[targetOptionIndex] = StatefulOption.create(targetOption.option, targetOption.status)
                }
                return newState
            }
        },
        markOptionsForComputationNode: (state, action: PayloadAction<MarkNodeOptionsPayload>) => {
            const newState = _.cloneDeep<ComputationState>(state)
            const target = visit(action.payload.serialId, newState.value)
            if (target) {
                const newOptions = target.options.map(item => {
                    if(action.payload.ids.includes(item.option.id)){
                        item.status=true
                    }else{
                        item.status=false
                    }
                    return item;
                })

                target.options=newOptions
                return newState
            }
        },
    }
})

export const {
    addComputationNode,
    removeComputationNode,
    clearOptionsStatusForComputationNode,
    markOptionsStatusForComputationNode,
    markOptionsForComputationNode,
} = computationSlice.actions

export default computationSlice.reducer