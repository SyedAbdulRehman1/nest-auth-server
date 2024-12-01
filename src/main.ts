// import * as dotenv from 'dotenv';
// import { NestFactory } from '@nestjs/core';
// import { AppModule } from './app.module';
// dotenv.config();
// // const app = await NestFactory.create(AppModule);

// async function bootstrap() {
//   const app = await NestFactory.create(AppModule);

//   app.enableCors({
//     origin: 'http://localhost:3000',
//     methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//     credentials: true,
//   });
//   await app.listen(3001);
// }
// bootstrap();
import * as dotenv from 'dotenv';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ExpressAdapter } from '@nestjs/platform-express';
// import * as express from 'express';
import express from 'express';

dotenv.config();
const server = express();

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, new ExpressAdapter(server));
console.log(process.env.FRONT_END_URL,"FRONT_END_URL");
    app.enableCors({
      origin: "http://localhost:3000/", // Adjust this if your frontend is hosted elsewhere
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      credentials: true,
    });

    // Initialize NestJS and start the Express server
    await app.init();

    // Listen on the port specified in environment variables, or use a default port
    const port = process.env.PORT || 3001;
    server.listen(port, () => {
      console.log(`Server is running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Error during app initialization:', error);
    process.exit(1);
  }
}

bootstrap();

export default server;
