import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { LinkController } from './link.controller';
import { LinkService } from './link.service';
import { Link } from './link.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Link])],
  controllers: [LinkController],
  providers: [LinkService],
})
export class LinkModule {}
