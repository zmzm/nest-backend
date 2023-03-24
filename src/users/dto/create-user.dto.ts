import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ description: 'User email', example: 'user@test.com' })
  @IsEmail({}, { message: 'Incorrect email' })
  @IsNotEmpty({ message: 'Should not be empty' })
  readonly email: string;

  @ApiProperty({ description: 'User password', example: 'testPassword123' })
  @IsString({ message: 'Should be a string' })
  @IsNotEmpty({ message: 'Should not be empty' })
  @Length(4, 15, {
    message: 'Password length should be between 4 and 15 symbols',
  })
  readonly password: string;
}
