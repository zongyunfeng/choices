class MarkNodeOptionsPayload {
    status:boolean;
    /**
     * option ids
     */
    ids:Array<string>;
    /**
     * target computation node serialId
     */
    serialId:string;

    private constructor(data:MarkNodeOptionsPayload) {
        this.status = data.status;
        this.ids = data.ids;
        this.serialId = data.serialId;
    }

    public static create(ids: Array<string>,serialId:string,status:boolean){
        return new MarkNodeOptionsPayload({
            status,ids,serialId
        })
    }
}

export {MarkNodeOptionsPayload}