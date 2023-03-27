import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { PostsService } from './posts.service';
import { Post as PostModel } from './entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { Roles } from '../auth/roles.decorator';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Post()
  @Roles('ADMIN', 'USER')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBody({ type: [CreatePostDto] })
  @ApiOperation({ summary: 'Create post' })
  @ApiResponse({ status: 200, type: PostModel })
  create(@Body() createPostDto: CreatePostDto, image: any) {
    return this.postsService.create(createPostDto, image);
  }

  @Get()
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get all posts' })
  @ApiResponse({ status: 200, type: [PostModel] })
  findAll() {
    return this.postsService.findAll();
  }

  @Get(':id')
  @Roles('ADMIN', 'USER')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get post' })
  @ApiResponse({ status: 200, type: PostModel })
  findOneById(@Param('id') id: string) {
    return this.postsService.findOneById(+id);
  }

  @Patch(':id')
  @Roles('ADMIN', 'USER')
  @ApiBody({ type: [UpdatePostDto] })
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Update post' })
  @ApiResponse({ status: 200, type: PostModel })
  update(@Param('id') id: string, @Body() updatePostDto: UpdatePostDto) {
    return this.postsService.update(+id, updatePostDto);
  }

  @Delete(':id')
  @Roles('ADMIN', 'USER')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Delete post' })
  @ApiResponse({ status: 200, type: PostModel })
  remove(@Param('id') id: string) {
    return this.postsService.remove(+id);
  }
}
