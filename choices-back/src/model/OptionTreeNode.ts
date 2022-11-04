class OptionTreeNode {
  /**
   * the id of the tree node
   */
  id: string;
  /**
   * the title of the tree node
   */
  title: string;
  /**
   * children nodes
   */
  children?: Array<OptionTreeNode>;
  /**
   * the id of the parent node
   */
  parent?: string;

  constructor(data?: OptionTreeNode) {
    this.id = data?.id || '';
    this.title = data?.title || '';
    this.children = data?.children;
    this.parent = data?.parent;
  }
}

export { OptionTreeNode };
