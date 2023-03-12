import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ description: 'Role type', example: 'ADMIN' })
  readonly type: string;

  @ApiProperty({
    description: 'Role description',
    example: 'Super user type which allows all kinds of operations',
  })
  readonly description: string;
}
