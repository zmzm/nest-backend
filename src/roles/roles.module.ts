import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { Role } from './entities/role.entity';
import { User } from '../users/entities/user.entity';
import { UserRoles } from './entities/userRoles.entity';

@Module({
  controllers: [RolesController],
  providers: [RolesService],
  imports: [SequelizeModule.forFeature([Role, User, UserRoles])],
  exports: [RolesService],
})
export class RolesModule {}
