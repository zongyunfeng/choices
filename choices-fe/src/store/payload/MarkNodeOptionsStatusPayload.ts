class MarkNodeOptionsStatusPayload {
    status:boolean;
    id:string;
    serialId:string;

    private constructor(data:MarkNodeOptionsStatusPayload) {
        this.status = data.status;
        this.id = data.id;
        this.serialId = data.serialId;
    }

    public static create(id: string,serialId:string,status:boolean){
        return new MarkNodeOptionsStatusPayload({
            status,id,serialId
        })
    }
}

export {MarkNodeOptionsStatusPayload}