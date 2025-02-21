import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';

import { LinkService } from './link.service';

import { CreateLinkDto } from './dto/createLink.dto';
import { UpdateLinkDto } from './dto/updateLink.dto';

import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller()
export class LinkController {
  constructor(private linkService: LinkService) {}

  @Get('/links')
  @UseGuards(AuthGuard)
  getLinks() {
    return this.linkService.getLinks();
  }

  @Get('/links/:id')
  @UseGuards(AuthGuard)
  // --Pipe: 데이터 형식을 원하는대로 수정 (ParseIntPipe: Int형식)
  getLinkById(@Param('id', ParseIntPipe) id: number) {
    return this.linkService.getLinkById(id);
  }

  @Post('/links')
  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe) // --UsePipes: Dto에 정의해 놓은 validation 동작
  createLink(@Body() createLinkDto: CreateLinkDto) {
    return this.linkService.createLink(createLinkDto);
  }

  @Patch('/links/:id')
  @UseGuards(AuthGuard)
  @UsePipes(ValidationPipe)
  updateLink(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLinkDto: UpdateLinkDto,
  ) {
    return this.linkService.updateLink(id, updateLinkDto);
  }

  @Delete('/links/:id')
  @UseGuards(AuthGuard)
  deleteLink(@Param('id', ParseIntPipe) id: number) {
    return this.linkService.deleteLink(id);
  }
}
