import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { Request } from 'express';

import { LinkService } from './link.service';

import { CreateLinkDto } from './dto/createLink.dto';
import { UpdateLinkDto } from './dto/updateLink.dto';

import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller()
@UseGuards(AuthGuard)
export class LinkController {
  constructor(private linkService: LinkService) {}

  @Get('/links')
  getLinks() {
    return this.linkService.getLinks();
  }

  @Get('/links/search')
  searchLinks(
    @Query('category') category?: string,
    @Query('keyword') keyword?: string,
  ) {
    const categoryId =
      category && !isNaN(Number(category)) ? Number(category) : undefined;
    return this.linkService.searchLinks(categoryId, keyword);
  }

  @Get('/links/:id')
  // --Pipe: 데이터 형식을 원하는대로 수정 (ParseIntPipe: Int형식)
  getLinkById(@Param('id', ParseIntPipe) id: number) {
    return this.linkService.getLinkById(id);
  }

  @Post('/links')
  @UsePipes(ValidationPipe) // --UsePipes: Dto에 정의해 놓은 validation 동작
  createLink(@Body() createLinkDto: CreateLinkDto, @Req() req: Request) {
    const userId = req.user as number;
    return this.linkService.createLink(createLinkDto, userId);
  }

  @Patch('/links/:id')
  @UsePipes(ValidationPipe)
  updateLink(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateLinkDto: UpdateLinkDto,
    @Req() req: Request,
  ) {
    const userId = req.user as number;
    return this.linkService.updateLink(id, updateLinkDto, userId);
  }

  @Delete('/links/:id')
  deleteLink(@Param('id', ParseIntPipe) id: number, @Req() req: Request) {
    const userId = req.user as number;
    return this.linkService.deleteLink(id, userId);
  }
}
