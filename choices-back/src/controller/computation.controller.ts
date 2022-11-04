import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ComputationService } from '../service/computation.service';
import { TransformInterceptor } from '../interceptor/transform.interceptor';
import { GetComputationItemParam } from '../service/payload/GetComputationItemParam';

@Controller('/computation')
@UseInterceptors(TransformInterceptor)
export class ComputationController {
  constructor(private readonly optionsService: ComputationService) {}

  @Post('/tree')
  async getOptionTree() {
    return this.optionsService.getOptionTree();
  }

  @Post('/item')
  async getComputationItem(@Body() optionsParam: GetComputationItemParam) {
    return this.optionsService.getComputationItem(optionsParam);
  }
}
