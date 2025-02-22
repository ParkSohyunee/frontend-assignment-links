import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SharedLinkController } from './shared-link.controller';
import { SharedLinkService } from './shared-link.service';
import { SharedLink } from './shared-link.entity';

import { User } from 'src/auth/user.entity';
import { AuthModule } from 'src/auth/auth.module';

import { Link } from 'src/link/link.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SharedLink, User, Link]), AuthModule],
  controllers: [SharedLinkController],
  providers: [SharedLinkService],
})
export class SharedLinkModule {}
