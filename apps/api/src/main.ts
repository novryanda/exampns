import 'dotenv/config';
import { join } from 'node:path';
import { NestFactory } from '@nestjs/core';
import express, { json, urlencoded } from 'express';
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

  app.use(
    '/api/v1/uploads',
    express.static(join(process.cwd(), 'uploads'), {
      maxAge: '7d',
      fallthrough: true,
    }),
  );

  app.use('/api/auth', toNodeHandler(auth));
  app.use(json({ limit: '10mb' }));
  app.use(urlencoded({ extended: true, limit: '10mb' }));

  const port = process.env.PORT ?? 3001;
  await app.listen(port);
  logEmailTransportConfig();
  console.info(`[api] listening on http://localhost:${port}`);
}

void bootstrap();
