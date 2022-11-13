class OptionTreeNode {
    id: string;
    title: string;
    children?: Array<OptionTreeNode>;
    parent?: string;

    constructor(data?: OptionTreeNode) {
        this.id = data?.id || '';
        this.title = data?.title || '';
        this.children = data?.children;
        this.parent = data?.parent;
    }

    public static create(id: string,title: string,children: Array<OptionTreeNode>=[],parent: string|undefined){
        return new OptionTreeNode({
            id,title,children,parent
        })
    }
}

export {OptionTreeNode}