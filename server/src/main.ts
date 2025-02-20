import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // CORS 설정
    // (참고 - Nest.js Docs) https://docs.nestjs.com/security/cors
    cors: {
      origin: 'http://localhost:5173', // 요청을 허용할 origin
      methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    },
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log('서버 실행');
}
bootstrap();
