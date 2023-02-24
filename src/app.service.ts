import { Injectable } from '@nestjs/common';

export type User = {
  id: number;
  name: string;
};

@Injectable()
export class AppService {
  getUsers(): User[] {
    return [{ id: 1, name: 'Vladjik' }];
  }
}
