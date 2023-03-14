import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  async login(createUserDto: CreateUserDto) {
    const user = await this.userService.findByEmail(createUserDto.email);
    return user;
  }

  async registration(createUserDto: CreateUserDto) {
    const user = await this.userService.findByEmail(createUserDto.email);
    return user;
  }
}
