import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreatePostDto {
  @ApiProperty({ description: 'Post title', example: 'Some title' })
  @IsString({ message: 'Should be a string' })
  @IsNotEmpty({ message: 'Should not be empty' })
  readonly title: string;

  @ApiProperty({ description: 'Post content', example: 'Some content' })
  @IsString({ message: 'Should be a string' })
  @IsNotEmpty({ message: 'Should not be empty' })
  readonly content: string;
}
