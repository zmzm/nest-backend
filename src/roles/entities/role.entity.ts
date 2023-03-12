import { ApiProperty } from '@nestjs/swagger';
import {
  BelongsToMany,
  Column,
  DataType,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/users/entities/user.entity';
import { UserRoles } from './userRoles.entity';

interface RoleCreationAttrs {
  type: string;
  description: string;
}

@Table({ tableName: 'roles' })
export class Role extends Model<Role, RoleCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  })
  @ApiProperty({ description: 'Role id', example: 1 })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  @ApiProperty({ description: 'Role type', example: 'ADMIN' })
  type: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty({
    description: 'Role description',
    example: 'Super user type which allows all kinds of operations',
  })
  description: string;

  @BelongsToMany(() => User, () => UserRoles)
  users: User[];
}
