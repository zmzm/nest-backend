import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { FilesService } from '../files/files.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Post } from './entities/post.entity';

@Injectable()
export class PostsService {
  constructor(
    @InjectModel(Post)
    private readonly postModel: typeof Post,
    private readonly fileService: FilesService
  ) {}

  async create(createPostDto: CreatePostDto, image: Express.Multer.File) {
    const filename = await this.fileService.createFile(image);
    return this.postModel.create({ ...createPostDto, image: filename });
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
