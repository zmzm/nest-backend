import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { User } from '../users/entities/user.entity';
import { CreateRoleDto } from './dto/create-role.dto';
import { UpdateRoleDto } from './dto/update-role.dto';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectModel(Role)
    private readonly roleModel: typeof Role
  ) {}

  create(createRoleDto: CreateRoleDto) {
    return this.roleModel.create(createRoleDto);
  }

  findAll() {
    return this.roleModel.findAll({ include: User });
  }

  findOneById(id: number) {
    return this.roleModel.findOne({ where: { id }, include: User });
  }

  findOneByType(type: string) {
    return this.roleModel.findOne({ where: { type }, include: User });
  }

  async update(id: number, updateRoleDto: UpdateRoleDto) {
    const role = await this.findOneById(id);

    await role.update(updateRoleDto);
    await role.save();

    return role;
  }

  async remove(id: number) {
    const role = await this.findOneById(id);

    await role.destroy();

    return id;
  }
}
