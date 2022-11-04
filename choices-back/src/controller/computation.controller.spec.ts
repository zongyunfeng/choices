import { Test, TestingModule } from '@nestjs/testing';
import { ComputationService } from '../service/computation.service';
import { ComputationController } from './computation.controller';

describe('AppController', () => {
  let appController: ComputationController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ComputationController],
      providers: [ComputationService],
    }).compile();

    appController = app.get<ComputationController>(ComputationController);
  });

  describe('root', () => {
    it('should return an array', () => {
      expect(appController.getOptionTree()).toBeInstanceOf([]);
    });
  });
});
