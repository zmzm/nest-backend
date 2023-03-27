import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post)
    private readonly postModel: typeof Post
  ) {}

  create(createPostDto: CreatePostDto, image: any) {
    return this.postModel.create({ ...createPostDto, image });
  }

  findAll() {
    return this.postModel.findAll();
  }

  findOneById(id: number) {
    return this.postModel.findOne({ where: { id } });
  }

  async update(id: number, updatePost: UpdatePostDto) {
    const post = await this.findOneById(id);

    await post.update(updatePost);
    await post.save();

    return post;
  }

  async remove(id: number) {
    const post = await this.findOneById(id);

    await post.destroy();

    return id;
  }
}
