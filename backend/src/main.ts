import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClassSerializerInterceptor } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.useGlobalInterceptors(new ClassSerializerInterceptor (app.get(Reflector)));
  app.setGlobalPrefix('api');
  
  app.enableCors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'], 
    // allowedHeaders: ['Content-Type', 'Authorization'], 
});

  await app.listen(3000);
}
bootstrap();
