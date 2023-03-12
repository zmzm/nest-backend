import { getModelToken } from '@nestjs/sequelize';
import { Test, TestingModule } from '@nestjs/testing';
import { Role } from './entities/role.entity';
import { RolesController } from './roles.controller';
import { RolesService } from './roles.service';

describe('RolesController', () => {
  let controller: RolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RolesController],
      providers: [
        RolesService,
        { provide: getModelToken(Role), useValue: jest.fn() },
      ],
    }).compile();

    controller = module.get<RolesController>(RolesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
