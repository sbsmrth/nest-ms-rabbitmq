import { NestFactory } from '@nestjs/core';
import { ApiGatewayModule } from './api-gateway.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { envs } from './config';

async function bootstrap() {
  const logger = new Logger('Main-Gateway');

  const app = await NestFactory.create(ApiGatewayModule);

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const appPort = envs.apiGatewayPort;

  await app.listen(appPort);

  logger.log(`API Gateway is running on: ${appPort}`);
}
bootstrap();
