import {EnumComputationOperationTypes} from "../../utils/enums";

class ChangeComputationOperationPayload {
    operation: EnumComputationOperationTypes
    targetSerialId: string

    constructor(data: ChangeComputationOperationPayload) {
        this.operation = data.operation
        this.targetSerialId = data.targetSerialId
    }

    public static create(operation: EnumComputationOperationTypes, targetSerialId: string) {
        return new ChangeComputationOperationPayload({
            operation, targetSerialId
        })
    }
}

export {ChangeComputationOperationPayload}