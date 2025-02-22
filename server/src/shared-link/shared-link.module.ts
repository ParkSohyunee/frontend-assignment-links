import { Module } from '@nestjs/common';
import { SharedLinkController } from './shared-link.controller';
import { SharedLinkService } from './shared-link.service';

@Module({
  controllers: [SharedLinkController],
  providers: [SharedLinkService]
})
export class SharedLinkModule {}
