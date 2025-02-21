import { Controller, Get, UseGuards } from '@nestjs/common';

import { CategoryService } from './category.service';

import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('categories')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Get()
  @UseGuards(AuthGuard)
  categories() {
    return this.categoryService.categories();
  }
}
