import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from '../roles/entities/role.entity';
import { RolesService } from '../roles/roles.service';
import { AddRoleDto } from './dto/add-role.dto';
import { BanUserDto } from './dto/ban-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User)
    private readonly userModel: typeof User,
    private readonly roleService: RolesService
  ) {}

  async create(createUserDto: CreateUserDto) {
    const user = await this.userModel.create(createUserDto);
    const role = await this.roleService.findOneByType('USER');
    await user.$set('roles', [role.id]);
    user.roles = [role];
    return user;
  }

  findAll() {
    return this.userModel.findAll({ include: Role });
  }

  findOne(id: number) {
    return this.userModel.findOne({ where: { id }, include: Role });
  }

  findByEmail(email: string) {
    return this.userModel.findOne({ where: { email }, include: Role });
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.findOne(id);

    await user.update(updateUserDto);
    await user.save();

    return user;
  }

  async remove(id: number) {
    const user = await this.findOne(id);

    await user.destroy();

    return id;
  }

  async addRole(addRoleDto: AddRoleDto) {
    const user = await this.findOne(addRoleDto.userId);
    const role = await this.roleService.findOneByType(addRoleDto.type);

    if (user && role) {
      user.$add('roles', role.id);

      return user;
    }

    throw new HttpException('User or role not found.', HttpStatus.NOT_FOUND);
  }

  async banUser(banUserDto: BanUserDto) {
    const user = await this.findOne(banUserDto.userId);

    if (user) {
      user.banned = true;
      user.banReason = banUserDto.banReason;
      user.save();

      return user;
    }

    throw new HttpException('User not found.', HttpStatus.NOT_FOUND);
  }
}
