import { ApiProperty } from '@nestjs/swagger';
import {
  Column,
  DataType,
  Table,
  Model,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import { User } from '../../users/entities/user.entity';

interface PostCreationAttrs {
  title: string;
  content: string;
}

@Table({ tableName: 'posts' })
export class Post extends Model<Post, PostCreationAttrs> {
  @Column({
    type: DataType.INTEGER,
    unique: true,
    autoIncrement: true,
    allowNull: false,
    primaryKey: true,
  })
  @ApiProperty({ description: 'Post id', example: 1 })
  id: number;

  @Column({
    type: DataType.STRING,
    unique: true,
    allowNull: false,
  })
  @ApiProperty({ description: 'Post title', example: 'Post title' })
  title: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  @ApiProperty({ description: 'Post content', example: 'Post content' })
  content: string;

  @BelongsTo(() => User)
  author: User;

  @ForeignKey(() => User)
  @Column({ type: DataType.INTEGER })
  userId: number;
}
