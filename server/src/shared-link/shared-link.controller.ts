import {
  Controller,
  Post,
  Body,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { SharedLinkService } from './shared-link.service';

import { AuthGuard } from 'src/auth/guard/auth.guard';
import { SharedLinkDto } from './dto/shared-link.dto';

@Controller()
@UseGuards(AuthGuard)
export class SharedLinkController {
  constructor(private sharedLinkService: SharedLinkService) {}

  @Post('/links/share')
  shareLink(@Body(ValidationPipe) sharedLinkDto: SharedLinkDto) {
    return this.sharedLinkService.shareLink(sharedLinkDto);
  }
}
