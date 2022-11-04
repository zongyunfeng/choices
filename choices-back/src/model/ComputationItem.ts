import { Option } from './Option';

class ComputationItem {
  /**
   * the id of the corresponding tree node
   * @see OptionTreeNode#id for detail
   */
  nodeId: string;
  /**
   * the title of the item
   */
  title: string;
  /**
   * the directory of the item
   */
  directory: string;
  /**
   * the options of the item
   */
  options: Array<Option>;

  constructor(data?: ComputationItem) {
    this.nodeId = data?.nodeId || '';
    this.title = data?.title || '';
    this.directory = data?.directory || '';
    this.options = data?.options || [];
  }
}

export { ComputationItem };
