import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { AuthModule } from './auth/auth.module';
import { CategoryModule } from './category/category.module';
import { LinkModule } from './link/link.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }), // config 모듈을 통한 process.env 객체 사용
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/**/*.entity.{js,ts}'],
      synchronize: true, // 개발환경에서만 true
    }),
    AuthModule,
    CategoryModule,
    LinkModule,
  ],
  providers: [ConfigService],
})
export class AppModule {}
