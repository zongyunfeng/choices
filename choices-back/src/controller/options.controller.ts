import { Controller, Post, UseInterceptors } from '@nestjs/common';
import { OptionsService } from '../service/options.service';
import { TransformInterceptor } from '../interceptor/transform.interceptor';

@Controller('/options')
@UseInterceptors(TransformInterceptor)
export class OptionsController {
  constructor(private readonly optionsService: OptionsService) {}

  @Post('/tree')
  async getOptionTree() {
    return this.optionsService.getOptionTree();
  }
}
