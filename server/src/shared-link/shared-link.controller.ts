import {
  Controller,
  Post,
  Body,
  UseGuards,
  ValidationPipe,
  Req,
} from '@nestjs/common';
import { Request } from 'express';

import { SharedLinkService } from './shared-link.service';

import { AuthGuard } from 'src/auth/guard/auth.guard';
import { SharedLinkDto } from './dto/shared-link.dto';

@Controller()
@UseGuards(AuthGuard)
export class SharedLinkController {
  constructor(private sharedLinkService: SharedLinkService) {}

  @Post('/links/share')
  shareLink(
    @Body(ValidationPipe) sharedLinkDto: SharedLinkDto,
    @Req() req: Request,
  ) {
    const userId = req.user as number;
    return this.sharedLinkService.shareLink(sharedLinkDto, userId);
  }
}
