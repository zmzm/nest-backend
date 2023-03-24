import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class AddRoleDto {
  @ApiProperty({ description: 'User id', example: 2 })
  @IsNumber()
  @IsNotEmpty({ message: 'Should not be empty' })
  readonly userId: number;

  @ApiProperty({ description: 'Role type', example: 'ADMIN' })
  @IsString({ message: 'Should be a string' })
  @IsNotEmpty({ message: 'Should not be empty' })
  readonly type: string;
}
