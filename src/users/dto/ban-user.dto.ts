import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class BanUserDto {
  @ApiProperty({ description: 'User id', example: 2 })
  @IsNumber()
  @IsNotEmpty({ message: 'Should not be empty' })
  readonly userId: number;

  @ApiProperty({
    description: 'User ban reason',
    example: 'Disrespectful behaviour',
  })
  @IsString({ message: 'Should be a string' })
  @IsNotEmpty({ message: 'Should not be empty' })
  readonly banReason: string;
}
