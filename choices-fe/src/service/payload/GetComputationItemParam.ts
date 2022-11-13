class GetComputationItemParam {
    /**
     * the id of the requested computation item
     */
    id: string;

    private constructor(data?: GetComputationItemParam) {
        this.id = data?.id || '';
    }

    public static create(id: string) {
        return new GetComputationItemParam({id})
    }
}

export {GetComputationItemParam};
