import { Body, Controller, Get, Post } from '@nestjs/common';

import { LinkService } from './link.service';
import { CreateLinkDto } from './dto/createLinkDto.dto';

@Controller()
export class LinkController {
  constructor(private linkService: LinkService) {}

  @Get('/links')
  getLinks() {
    return this.linkService.getLinks();
  }

  @Post('/links')
  createLink(@Body() createLinkDto: CreateLinkDto) {
    return this.linkService.createLink(createLinkDto);
  }
}
