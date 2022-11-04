import { Injectable } from '@nestjs/common';
import { OptionTreeNode } from '../model/OptionTreeNode';
import { readFile } from 'fs/promises';
import * as path from 'path';

@Injectable()
export class OptionsService {
  async getOptionTree(): Promise<Array<OptionTreeNode>> {
    const optionTreeDataString = await readFile(
      path.resolve(__dirname, '../', '../', './optionTreeData.json'),
      {
        encoding: 'utf8',
      },
    );
    const optionTreeData = JSON.parse(optionTreeDataString);
    return optionTreeData.data as Array<OptionTreeNode>;
  }
}
