import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LinkController } from './link.controller';
import { LinkService } from './link.service';
import { Link } from './link.entity';

import { AuthModule } from 'src/auth/auth.module';
import { SharedLink } from 'src/shared-link/shared-link.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Link, SharedLink]), AuthModule],
  controllers: [LinkController],
  providers: [LinkService],
})
export class LinkModule {}
