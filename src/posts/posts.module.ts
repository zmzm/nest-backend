import { Module } from '@nestjs/common';
import { PostsService } from './posts.service';
import { PostsController } from './posts.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { Post } from './entities/post.entity';
import { User } from '../users/entities/user.entity';

@Module({
  controllers: [PostsController],
  providers: [PostsService],
  imports: [SequelizeModule.forFeature([Post, User])],
})
export class PostsModule {}
