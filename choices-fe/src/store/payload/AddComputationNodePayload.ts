import {ComputationItem} from "../../model/ComputationItem";

class AddComputationNodePayload {
    /**
     * serialId for the parent
     */
    parentSerialId: string;
    /**
     * the serialId on which drop action is occured
     */
    targetSerialId: string;
    /**
     * infos about the dragged tree item
     * @see ComputationItem for more details
     */
    item: ComputationItem;

    private constructor(data: AddComputationNodePayload) {
        this.parentSerialId = data.parentSerialId;
        this.targetSerialId = data.targetSerialId;
        this.item = data.item;
    }

    public static create(parentSerialId: string, targetSerialId: string, item: ComputationItem) {
        const data = new AddComputationNodePayload({
            parentSerialId, targetSerialId, item
        })
        return data;
    }
}

export {AddComputationNodePayload}