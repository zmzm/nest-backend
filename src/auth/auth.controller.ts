import { Controller, Post, Body } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { User } from '../users/entities/user.entity';

@ApiTags('Authorization endpoint')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @ApiBody({ type: [CreateUserDto] })
  @ApiOperation({ summary: 'Login user' })
  @ApiResponse({ status: 200, type: User })
  login(@Body() createUserDto: CreateUserDto) {
    return this.authService.login(createUserDto);
  }

  @Post('/registration')
  @ApiBody({ type: [CreateUserDto] })
  @ApiOperation({ summary: 'Register user' })
  @ApiResponse({ status: 200, type: User })
  registration(@Body() createUserDto: CreateUserDto) {
    return this.authService.registration(createUserDto);
  }
}
