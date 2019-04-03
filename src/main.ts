import { INestApplication } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';

import compression from 'compression';
import cookie from 'cookie-parser';
import csurf from 'csurf';
import Rate from 'express-rate-limit';
import helmet from 'helmet';

import { AppModule } from 'modules';

interface IApplication {
  bootstrap(): Promise<void>;
}

class Application implements IApplication {
  private instanceRef: INestApplication | null = null;

  public async bootstrap(): Promise<void> {
    try {
      this.instanceRef = await NestFactory.create<NestExpressApplication>(AppModule, {
        bodyParser: true,
        // cors: false,
      });

      // security
      this.instanceRef.use(cookie());

      this.instanceRef.use(helmet());

      this.instanceRef.use(new Rate({
        max: 100,
        windowMs: 1000 * 60 * 15,
      }));

      this.instanceRef.enableCors({
        credentials: true,
        allowedHeaders: ['Origin', 'Content-Type', 'Accept'],
        methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS', 'UPDATE'],
        origin(origin, callback) {
          callback(null, true);
        },
      });

      this.instanceRef.use(compression());

      this.instanceRef.setGlobalPrefix('/api');

      await this.instanceRef.listen(process.env.PORT!);
    } catch (err) {
      console.error('[application]', err);

      process.exit(1);
    }
  }
}

const app: IApplication = new Application();

app.bootstrap();
