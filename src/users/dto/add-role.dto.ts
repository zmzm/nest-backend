import { ApiProperty } from '@nestjs/swagger';

export class AddRoleDto {
  @ApiProperty({ description: 'User id', example: '2' })
  readonly userId: number;

  @ApiProperty({ description: 'Role type', example: 'ADMIN' })
  readonly type: string;
}
