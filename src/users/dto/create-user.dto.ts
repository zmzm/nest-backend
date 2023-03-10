import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'User email' })
  readonly email: string;

  @ApiPropertyOptional({ description: 'User password' })
  readonly password: string;
}
