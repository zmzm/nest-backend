import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/sequelize';
import { Role } from '../roles/entities/role.entity';
import { RolesService } from '../roles/roles.service';
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
}
