import { NestFactory } from '@nestjs/core';
import { ComputationModule } from './module/computation.module';

async function bootstrap() {
  const app = await NestFactory.create(ComputationModule);
  // enabled for local dev by yunfengzz
  if (process.env.isLocal) {
    app.enableCors();
  }
  const port = process.env.port || 8000;
  // indicate the port num in terminal on which the app is currently running
  console.info({ port });
  await app.listen(port);
}
bootstrap();
