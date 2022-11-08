import {EnumComputationOperationTypes} from "./enums";

const Root_Computation_Node_SerialId = '_RootNode'

const ComputationOptions = [
    {
        title: 'AND',
        value: EnumComputationOperationTypes.AND
    },
    {
        title: 'OR',
        value: EnumComputationOperationTypes.OR
    }
] as const

export {Root_Computation_Node_SerialId, ComputationOptions}