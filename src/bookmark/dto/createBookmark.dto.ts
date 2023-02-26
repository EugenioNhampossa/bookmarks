import { IsOptional, IsString } from 'class-validator';

export class CreateBookmarkDTO {
  @IsString()
  title: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsString()
  link: string;
}
