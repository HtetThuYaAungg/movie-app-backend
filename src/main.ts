import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

const jwtTokenName = 'jwt';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
app.useGlobalPipes(new ValidationPipe())
  const config = new DocumentBuilder()
    .setTitle('Api Config')
    .setDescription('API description')
    .setVersion('0.1')
    .addBearerAuth(
      {
        description: `[just text field] Please enter token in following format: Bearer <JWT>`,
        name: 'Authorization',
        bearerFormat: 'Bearer',
        scheme: 'Bearer',
        type: 'http',
        in: 'Header',
      },
      jwtTokenName,
    )
    .addSecurityRequirements(jwtTokenName)
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(3000);
}
bootstrap();
