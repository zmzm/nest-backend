import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({ description: 'Role type', example: 'ADMIN' })
  @IsString({ message: 'Should be a string' })
  @IsNotEmpty({ message: 'Should not be empty' })
  readonly type: string;

  @ApiProperty({
    description: 'Role description',
    example: 'Super user type which allows all kinds of operations',
  })
  @IsString({ message: 'Should be a string' })
  @IsNotEmpty({ message: 'Should not be empty' })
  readonly description: string;
}
