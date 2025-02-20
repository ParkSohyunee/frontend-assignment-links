import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateLinkDto {
  @IsNotEmpty() // validation check
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  url: string;

  @IsNotEmpty()
  @IsNumber()
  category: number;
}
