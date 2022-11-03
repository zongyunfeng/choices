import { Module } from '@nestjs/common';
import { OptionsController } from '../controller/options.controller';
import { OptionsService } from '../service/options.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.production'],
    }),
  ],
  controllers: [OptionsController],
  providers: [OptionsService],
})
export class OptionsModule {}
