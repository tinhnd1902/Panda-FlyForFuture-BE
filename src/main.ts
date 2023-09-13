import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use('/health', (req, res) => {
    res.status(200).send('OK');
  });

  app.enableCors({
    // origin: 'http://localhost:8080', //only allow this domain to access
    credentials: true,
  });

  const configService = app.get<ConfigService>(ConfigService);

  const config = new DocumentBuilder()
    .addBearerAuth(undefined, 'access-token')
    .setTitle('Panda Account API')
    .setDescription('The Panda Account description')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  const port = configService.get<number>('PORT') || 3000;
  await app.listen(port);
  console.info(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
