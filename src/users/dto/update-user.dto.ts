import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({ description: 'User email', example: 'user@test.com' })
  readonly email: string;

  @ApiProperty({ description: 'User ban status', example: false })
  readonly banned: boolean;

  @ApiProperty({ description: 'User ban reason', example: '' })
  readonly banReason: string;
}
