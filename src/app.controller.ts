import { Controller, Get } from '@nestjs/common';
import { AppService, User } from './app.service';

@Controller('/api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/users')
  getUsers(): User[] {
    return this.appService.getUsers();
  }
}
