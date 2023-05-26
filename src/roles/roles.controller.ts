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
import { RolesService } from './roles.service';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Role } from './entities/role.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { RolesGuard } from '../auth/roles.guard';
import { Roles } from '../auth/roles.decorator';

@ApiTags('Roles endpoint')
@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @Post()
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBody({ type: [CreateRoleDto] })
  @ApiOperation({ summary: 'Create role' })
  @ApiResponse({ status: 200, type: Role })
  create(@Body() createRoleDto: CreateRoleDto) {
    return this.rolesService.create(createRoleDto);
  }

  @Get()
  @Roles('ADMIN', 'USER')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get all roles' })
  @ApiResponse({ status: 200, type: [Role] })
  findAll() {
    return this.rolesService.findAll();
  }

  @Get(':id')
  @Roles('ADMIN', 'USER')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get role by id' })
  @ApiResponse({ status: 200, type: Role })
  findOneById(@Param('id') id: string) {
    return this.rolesService.findOneById(+id);
  }

  @Get(':type')
  @Roles('ADMIN', 'USER')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Get role by type' })
  @ApiResponse({ status: 200, type: Role })
  findOneByType(@Param('type') type: string) {
    return this.rolesService.findOneByType(type);
  }

  @Patch(':id')
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiBody({ type: [UpdateRoleDto] })
  @ApiOperation({ summary: 'Update role by id' })
  @ApiResponse({ status: 200, type: Role })
  update(@Param('id') id: string, @Body() updateRoleDto: UpdateRoleDto) {
    return this.rolesService.update(+id, updateRoleDto);
  }

  @Delete(':id')
  @Roles('ADMIN')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @ApiOperation({ summary: 'Delete role by id' })
  @ApiResponse({ status: 200, type: Number })
  remove(@Param('id') id: string) {
    return this.rolesService.remove(+id);
  }
}
