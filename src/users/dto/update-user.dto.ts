import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ description: 'User email', example: 'user@test.com' })
  @IsEmail({}, { message: 'Incorrect email' })
  @IsNotEmpty({ message: 'Should not be empty' })
  readonly email: string;

  @ApiProperty({ description: 'User ban status', example: false })
  @IsBoolean({ message: 'Should be true or false' })
  readonly banned: boolean;

  @ApiProperty({ description: 'User ban reason', example: '' })
  @IsString({ message: 'Should be a string' })
  readonly banReason: string;
}
