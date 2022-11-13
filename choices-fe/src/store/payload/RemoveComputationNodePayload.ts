class RemoveComputationNodePayload {
    /**
     * parent serialId
     */
    parentSerialId: string;
    /**
     * target serialId
     */
    targetSerialId: string;

    private constructor(data: RemoveComputationNodePayload) {
        this.parentSerialId = data.parentSerialId;
        this.targetSerialId = data.targetSerialId
    }

    public static create(parentSerialId: string, targetSerialId: string) {
        return new RemoveComputationNodePayload({
            parentSerialId, targetSerialId
        })
    }
}

export {RemoveComputationNodePayload}