import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { CustomLogger } from './common/logging/logging.service';
import { HttpExceptionFilter } from './common/exceptionFilter/exceptionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('NodeJS2024Q3-Service')
    .setVersion('1.0')
    .addTag('service')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('doc', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const customLogger = app.get(CustomLogger);
  app.useLogger(customLogger);
  app.useGlobalFilters(new HttpExceptionFilter(customLogger));

  await app.listen(process.env.PORT);
}
bootstrap();
