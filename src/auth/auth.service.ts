import * as bcrypt from 'bcrypt';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

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

    if (user) {
      throw new HttpException('User aleady exists', HttpStatus.BAD_REQUEST);
    }

    const hashedPassword = await bcrypt.hash(createUserDto.password, 7);
    const newUser = await this.userService.create({
      ...createUserDto,
      password: hashedPassword,
    });

    return this.generateToken(newUser);
  }

  generateToken(user: User) {
    const payload = { sub: user.id, email: user.email };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
