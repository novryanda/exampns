import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { json, urlencoded } from 'express';
import { toNodeHandler } from 'better-auth/node';
import { auth } from './auth/auth.js';
import { AppModule } from './app.module.js';
import { logEmailTransportConfig } from './notification/email.service.js';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });

  app.enableShutdownHooks();
  app.enableCors({
    origin: [process.env.FRONTEND_URL ?? 'http://localhost:3000'],
    credentials: true,
  });
  app.setGlobalPrefix('api/v1');

  app.use('/api/auth', toNodeHandler(auth));
  app.use(json());
  app.use(urlencoded({ extended: true }));

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  logEmailTransportConfig();
  console.info(`[api] listening on http://localhost:${port}`);
}

void bootstrap();
