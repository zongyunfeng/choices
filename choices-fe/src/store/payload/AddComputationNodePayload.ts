import {ComputationItem} from "../../model/ComputationItem";

class AddComputationNodePayload {
    parentSerialId: string;
    targetSerialId: string;
    item: ComputationItem;

    private constructor(data: AddComputationNodePayload) {
        this.parentSerialId = data.parentSerialId;
        this.targetSerialId = data.targetSerialId
        this.item = data.item;
    }

    public static create(parentSerialId: string,  targetSerialId: string,item: ComputationItem) {
        const data = new AddComputationNodePayload({
            parentSerialId, targetSerialId, item
        })
        return data;
    }
}

export {AddComputationNodePayload}