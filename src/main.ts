import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import client from './connection';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('FRT API')
    .setDescription('Find Restaurant Together API description')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('/', app, document);

  try {
    const health = await client.cluster.health({});
    console.log(health);
  } catch (error) {
    console.error(error);
  }

  await app.listen(3000);
}

bootstrap();
