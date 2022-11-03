import { Test, TestingModule } from '@nestjs/testing';
import { OptionsController } from './app.controller';
import { OptionsService } from './app.service';

describe('AppController', () => {
  let appController: OptionsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [OptionsController],
      providers: [OptionsService],
    }).compile();

    appController = app.get<OptionsController>(OptionsController);
  });

  describe('root', () => {
    it('should return an array', () => {
      expect(appController.getOptionTree()).toBeInstanceOf([]);
    });
  });
});
