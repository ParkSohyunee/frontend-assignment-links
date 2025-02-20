import { IsString, IsNumber, IsOptional } from 'class-validator';

export class UpdateLinkDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  url: string;

  @IsOptional()
  @IsNumber()
  categoryId: number;
}
