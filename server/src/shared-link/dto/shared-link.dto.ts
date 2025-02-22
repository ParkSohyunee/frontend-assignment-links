import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class SharedLinkDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsNumber()
  @IsNotEmpty()
  linkId: number;
}
