import { NestFactory } from '@nestjs/core';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import express from 'express';
import { Express } from 'express';

const server: Express = express();

export const createNestServer = async (expressInstance: Express) => {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(expressInstance));
    app.setGlobalPrefix('/v1');
    app.enableCors({ origin: '*' });
    return app.init();
};

createNestServer(server)
    .then(() => console.log('Nest Ready'))
    .catch((err) => console.error('Nest broken', err));

export { server };
