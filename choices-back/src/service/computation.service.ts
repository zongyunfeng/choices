import { Injectable } from '@nestjs/common';
import { OptionTreeNode } from '../model/OptionTreeNode';
import { readFile } from 'fs/promises';
import * as path from 'path';
import { GetComputationItemParam } from './payload/GetComputationItemParam';
import { ComputationItem } from '../model/ComputationItem';

@Injectable()
export class ComputationService {
  /**
   * get all tree nodes for computation
   * @return {Array<OptionTreeNode>}
   */
  async getOptionTree(): Promise<Array<OptionTreeNode>> {
    const optionTreeDataStr = await readFile(
      path.resolve(__dirname, '../', '../', './optionTreeData.json'),
      {
        encoding: 'utf8',
      },
    );
    const optionTreeData = JSON.parse(optionTreeDataStr);
    return optionTreeData.data as Array<OptionTreeNode>;
  }

  /**
   * get the corresponding computation options for the tree node
   * @param optionsParam
   * @return {ComputationItem|undefined}
   */
  async getComputationItem(
    optionsParam: GetComputationItemParam,
  ): Promise<ComputationItem | undefined> {
    const computationItemsDataStr = await readFile(
      path.resolve(__dirname, '../', '../', './computationItemsData.json'),
      {
        encoding: 'utf8',
      },
    );
    const allComputationItemsData = JSON.parse(computationItemsDataStr);
    const allComputationItems =
      allComputationItemsData.data as Array<ComputationItem>;
    const targetComputationItem = allComputationItems.find(
      (item) => item.nodeId === optionsParam.id,
    );
    return targetComputationItem;
  }
}
