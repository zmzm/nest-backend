import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { Role } from '../../roles/entities/role.entity';
import { UserRoles } from '../../roles/entities/userRoles.entity';

interface UserCreationAttrs {
  emial: string;
  password: string;
}

@Table({ tableName: 'users' })
export class User extends Model<User, UserCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  })
  @ApiProperty({ description: 'User id', example: 1 })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  @ApiProperty({ description: 'User email', example: 'user@test.com' })
  email: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty({ description: 'User password', example: 'testPassword123' })
  password: string;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  @ApiProperty({ description: 'User ban status', example: false })
  banned: boolean;

  @Column({
    type: DataType.STRING,
    allowNull: true,
  })
  @ApiProperty({
    description: 'User ban reason',
    example: 'Disrespectful behaviour',
  })
  banReason: string;

  @BelongsToMany(() => Role, () => UserRoles)
  roles: Role[];
}
