import { ApiProperty } from '@nestjs/swagger';

export class BanUserDto {
  @ApiProperty({ description: 'User id', example: '2' })
  readonly userId: number;

  @ApiProperty({
    description: 'User ban reason',
    example: 'Disrespectful behaviour',
  })
  readonly banReason: string;
}
