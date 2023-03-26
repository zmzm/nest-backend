import { Role } from '../../roles/entities/role.entity';

export class UserPayloadDto {
  readonly sub: string;

  readonly email: string;

  readonly roles: Role[];
}
