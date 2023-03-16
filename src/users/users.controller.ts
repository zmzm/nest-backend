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
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@ApiTags('Users endpoint')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: [CreateUserDto] })
  @ApiOperation({ summary: 'Create user' })
  @ApiResponse({ status: 200, type: User })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all users' })
  @ApiResponse({ status: 200, type: [User] })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get user by id' })
  @ApiResponse({ status: 200, type: User })
  findOne(@Param('id') id: string) {
    console.log(id);
    return this.usersService.findOne(+id);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  @ApiBody({ type: [UpdateUserDto] })
  @ApiOperation({ summary: 'Update user' })
  @ApiResponse({ status: 200, type: User })
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Delete user' })
  @ApiResponse({ status: 200, type: Number })
  remove(@Param('id') id: string) {
    return this.usersService.remove(+id);
  }
}
