import { Module } from '@nestjs/common';
import { ComputationController } from '../controller/computation.controller';
import { ComputationService } from '../service/computation.service';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env.development', '.env.production'],
    }),
  ],
  controllers: [ComputationController],
  providers: [ComputationService],
})
export class ComputationModule {}
