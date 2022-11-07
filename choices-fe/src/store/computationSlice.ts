import {createSlice, nanoid} from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import {ComputationNode} from "../model/ComputationNode";
import {AddComputationNodePayload} from "./payload/AddComputationNodePayload";
import {ComputationItem} from "../model/ComputationItem";
import {StatefulOption} from "../model/StatefulOption";
import {Option} from "../model/Option";
import {visit} from "../utils/computationNodeVisitor";
import {MarkNodeOptionsStatusPayload} from "./payload/MarkNodeOptionsStatusPayload";
import * as _ from 'lodash'

export interface ComputationState {
    value: ComputationNode
}

// const rootNode = new ComputationNode(
//     {
//             nodeId: '',
//             title: '',
//             directory: '',
//             options: [],
//             serialId: '_RootNode',
//             parentSerialId: '',
//             children: [
//                 {
//                     nodeId: '636209c8fc13ae565c00064e',
//                     title: 'Age',
//                     directory: 'My Data / DeviceReach-ppid / Age',
//                     options: [
//                         {
//                             option: {
//                                 id: '25c0c232-333a-438b-b232-d82c4788b6d7',
//                                 title: '0',
//                                 count: 17
//                             },
//                             status: false
//                         },
//                         {
//                             option: {
//                                 id: 'b18b468f-e176-40c2-8207-170509d96e62',
//                                 title: '1',
//                                 count: 11
//                             },
//                             status: false
//                         },
//                         {
//                             option: {
//                                 id: 'bfd2cae1-bd2b-40ea-9f0a-ec73d38a53ac',
//                                 title: '5',
//                                 count: 56
//                             },
//                             status: false
//                         },
//                         {
//                             option: {
//                                 id: '7f1aa8e9-e791-4df5-97a8-b3fa3f4f064c',
//                                 title: '10',
//                                 count: 77
//                             },
//                             status: false
//                         },
//                         {
//                             option: {
//                                 id: '64de2879-1b2e-43e2-a0a6-aa9323939b4e',
//                                 title: '20',
//                                 count: 77
//                             },
//                             status: false
//                         },
//                         {
//                             option: {
//                                 id: '9c998f63-f19a-4a8a-8a01-984b8ad63a69',
//                                 title: '21',
//                                 count: 7
//                             },
//                             status: false
//                         },
//                         {
//                             option: {
//                                 id: '94c67913-9c78-4085-8e80-b1584d1372db',
//                                 title: '20',
//                                 count: 77
//                             },
//                             status: false
//                         },
//                         {
//                             option: {
//                                 id: 'fc086b65-92b4-489e-aebe-b677566ce886',
//                                 title: '21',
//                                 count: 7
//                             },
//                             status: false
//                         },
//                         {
//                             option: {
//                                 id: 'cd0db0ad-6c5f-4a83-8cfc-d60a3cd0e2ca',
//                                 title: '22',
//                                 count: 11
//                             },
//                             status: false
//                         },
//                         {
//                             option: {
//                                 id: '93005ae7-614b-4e36-b5f9-db8bc38e69dc',
//                                 title: '23',
//                                 count: 37
//                             },
//                             status: false
//                         },
//                         {
//                             option: {
//                                 id: 'f94a2c88-ad5a-48f9-b373-dd20e7c6386a',
//                                 title: '24',
//                                 count: 3
//                             },
//                             status: false
//                         },
//                         {
//                             option: {
//                                 id: 'b58d7fe9-f272-4111-8642-1c53366e4a7b',
//                                 title: '25',
//                                 count: 18
//                             },
//                             status: false
//                         },
//                         {
//                             option: {
//                                 id: '7409e346-48b1-4ba8-8042-0a52a8e44281',
//                                 title: '26',
//                                 count: 121
//                             },
//                             status: false
//                         },
//                         {
//                             option: {
//                                 id: '9490afa0-5fe1-4f6d-9f6e-ea0eea032a6c',
//                                 title: '27',
//                                 count: 357
//                             },
//                             status: false
//                         },
//                         {
//                             option: {
//                                 id: 'bde87e82-35f8-4eb6-a087-786c501ed17f',
//                                 title: '28',
//                                 count: 118
//                             },
//                             status: false
//                         },
//                         {
//                             option: {
//                                 id: '0afc8717-3176-4403-b651-2a221c82b965',
//                                 title: '29',
//                                 count: 47
//                             },
//                             status: false
//                         },
//                         {
//                             option: {
//                                 id: '85241581-5ac4-45eb-b9f4-4889009fc884',
//                                 title: '30',
//                                 count: 18
//                             },
//                             status: false
//                         },
//                         {
//                             option: {
//                                 id: '7d709331-c556-402d-9bfa-51119c970b51',
//                                 title: '31',
//                                 count: 211
//                             },
//                             status: false
//                         },
//                         {
//                             option: {
//                                 id: '952ae693-0fab-404e-a090-f03319f30dca',
//                                 title: '32',
//                                 count: 57
//                             },
//                             status: false
//                         },
//                         {
//                             option: {
//                                 id: '3a51b8d5-c267-409a-919a-76429468faa4',
//                                 title: '33',
//                                 count: 8
//                             },
//                             status: false
//                         }
//                     ],
//                     serialId: '-hbjFK2ufYczjl5O-DQGu',
//                     parentSerialId: '_RootNode',
//                     children: [
//                         {
//                         nodeId: '636209c8fc13ae565c000650',
//                         title: 'Gender',
//                         directory: 'My Data / DeviceReach-ppid / Gender',
//                         options: [
//                             {
//                                 option: {
//                                     id: 'f128efef-517d-44e9-a5d7-21d7b9838f88',
//                                     title: 'Male',
//                                     count: 87
//                                 },
//                                 status: false
//                             },
//                             {
//                                 option: {
//                                     id: '744f5dba-f239-43b0-b451-cdf48ab930f3',
//                                     title: 'Female',
//                                     count: 99
//                                 },
//                                 status: true
//                             },
//                             {
//                                 option: {
//                                     id: 'e506fa8e-0952-4b84-a45f-fba626cf5b8e',
//                                     title: 'Unknown',
//                                     count: 398
//                                 },
//                                 status: true
//                             }
//                         ],
//                         serialId: 'PhvluD4fktFYsiptd8oJ9',
//                         parentSerialId: '_RootNode',
//                         children: [],
//                         isGroupContainerNode: false
//                     },
//                         {
//                             nodeId: '636209c8fc13ae565c00064f',
//                             title: 'Education',
//                             directory: 'My Data / DeviceReach-ppid / Education',
//                             options: [
//                                 {
//                                     option: {
//                                         id: 'a577a88d-3e42-47a9-87f8-9056378df2ef',
//                                         title: 'College',
//                                         count: 366
//                                     },
//                                     status: false
//                                 },
//                                 {
//                                     option: {
//                                         id: '1bed59c4-198f-4c09-96cd-26ec5e6062b4',
//                                         title: 'Graduate',
//                                         count: 352
//                                     },
//                                     status: false
//                                 },
//                                 {
//                                     option: {
//                                         id: 'f5ad9291-ef39-4176-91c6-7a3e3e5c1dbb',
//                                         title: 'HighSchool',
//                                         count: 260
//                                     },
//                                     status: false
//                                 },
//                                 {
//                                     option: {
//                                         id: '15750543-25d6-4135-a146-28e53b72da2c',
//                                         title: 'Others',
//                                         count: 280
//                                     },
//                                     status: false
//                                 },
//                                 {
//                                     option: {
//                                         id: '8ad4247f-5623-4f67-9042-4b66563094a3',
//                                         title: 'PHD',
//                                         count: 270
//                                     },
//                                     status: false
//                                 },
//                                 {
//                                     option: {
//                                         id: 'e1cdebb8-8071-4627-8f04-6c3cd1ae3165',
//                                         title: 'University',
//                                         count: 469
//                                     },
//                                     status: false
//                                 }
//                             ],
//                             serialId: 'KzLADf8Du-m1sWFMNKPlZ',
//                             parentSerialId: '_RootNode',
//                             children: [],
//                             isGroupContainerNode: false
//                         },
//                         ],
//                     isGroupContainerNode: false
//                 },
//                 {
//                     nodeId: '636209c8fc13ae565c00064f',
//                     title: 'Education',
//                     directory: 'My Data / DeviceReach-ppid / Education',
//                     options: [
//                         {
//                             option: {
//                                 id: 'a577a88d-3e42-47a9-87f8-9056378df2ef',
//                                 title: 'College',
//                                 count: 366
//                             },
//                             status: false
//                         },
//                         {
//                             option: {
//                                 id: '1bed59c4-198f-4c09-96cd-26ec5e6062b4',
//                                 title: 'Graduate',
//                                 count: 352
//                             },
//                             status: false
//                         },
//                         {
//                             option: {
//                                 id: 'f5ad9291-ef39-4176-91c6-7a3e3e5c1dbb',
//                                 title: 'HighSchool',
//                                 count: 260
//                             },
//                             status: false
//                         },
//                         {
//                             option: {
//                                 id: '15750543-25d6-4135-a146-28e53b72da2c',
//                                 title: 'Others',
//                                 count: 280
//                             },
//                             status: false
//                         },
//                         {
//                             option: {
//                                 id: '8ad4247f-5623-4f67-9042-4b66563094a3',
//                                 title: 'PHD',
//                                 count: 270
//                             },
//                             status: false
//                         },
//                         {
//                             option: {
//                                 id: 'e1cdebb8-8071-4627-8f04-6c3cd1ae3165',
//                                 title: 'University',
//                                 count: 469
//                             },
//                             status: false
//                         }
//                     ],
//                     serialId: 'YQQq8lWbnfvzEC7zb4CU3',
//                     parentSerialId: '_RootNode',
//                     children: [{
//                         nodeId: '636209c8fc13ae565c000650',
//                         title: 'Gender',
//                         directory: 'My Data / DeviceReach-ppid / Gender',
//                         options: [
//                             {
//                                 option: {
//                                     id: 'f128efef-517d-44e9-a5d7-21d7b9838f88',
//                                     title: 'Male',
//                                     count: 87
//                                 },
//                                 status: false
//                             },
//                             {
//                                 option: {
//                                     id: '744f5dba-f239-43b0-b451-cdf48ab930f3',
//                                     title: 'Female',
//                                     count: 99
//                                 },
//                                 status: false
//                             },
//                             {
//                                 option: {
//                                     id: 'e506fa8e-0952-4b84-a45f-fba626cf5b8e',
//                                     title: 'Unknown',
//                                     count: 398
//                                 },
//                                 status: false
//                             }
//                         ],
//                         serialId: 'kdjym2aJQruNh1O7z4ZFb',
//                         parentSerialId: '_RootNode',
//                         children: [],
//                         isGroupContainerNode: false
//                     }],
//                     isGroupContainerNode: false
//                 },
//             ],
//             isGroupContainerNode: true
//     })

const rootNode = new ComputationNode(
    {
        nodeId: '',
        title: '',
        directory: '',
        options: [],
        serialId: '_RootNode',
        parentSerialId: '',
        children: [],
        isGroupContainerNode: true
    })

const initialState: ComputationState = {
    value: rootNode,
}

export const computationSlice = createSlice({
    name: 'computation',
    initialState,
    reducers: {
        addComputationNode: (state, action: PayloadAction<AddComputationNodePayload>) => {
            console.info({payload:action.payload})
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
            if (parent===newState.value) {
                if(!Boolean(action.payload.targetSerialId)){
                    parent?.children?.push(newNode)
                    return newState
                }
            }

            if (parent) {
                const targetIndex = parent.children.findIndex(item => item.serialId === action.payload.targetSerialId)
                if (targetIndex !== -1) {
                    const targetNode = parent.children[targetIndex]
                    const groupSerialId = nanoid();
                    if (targetNode) {
                        targetNode.parentSerialId = groupSerialId
                        newNode.parentSerialId=groupSerialId
                        const group = new ComputationNode({
                            nodeId: '',
                            title: '',
                            directory: '',
                            options: [],
                            serialId: groupSerialId,
                            parentSerialId: parent.serialId,
                            children: [targetNode, newNode],
                            isGroupContainerNode: true
                        })
                        parent.children[targetIndex] = group
                    }
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
            if (target) {
                const targetOptionIndex = target.options.findIndex(item => item.option.id === action.payload.id)
                const targetOption = target.options?.[targetOptionIndex]
                if (targetOption) {
                    targetOption.status = action.payload.status
                    target.options[targetOptionIndex] = StatefulOption.create(targetOption.option, targetOption.status)
                }
                return newState
            }
        },
    }
})

export const {
    addComputationNode,
    clearOptionsStatusForComputationNode,
    markOptionsStatusForComputationNode
} = computationSlice.actions

export default computationSlice.reducer