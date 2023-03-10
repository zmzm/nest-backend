import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'User email', example: 'user@test.com' })
  readonly email: string;

  @ApiProperty({ description: 'User password', example: 'testPassword123' })
  readonly password: string;
}
