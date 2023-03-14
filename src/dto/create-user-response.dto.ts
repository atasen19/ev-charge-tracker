import { Expose } from 'class-transformer';
import { UserType } from '../models/user.model';

export default class CreateUserResponseDTO {
  @Expose()
  id: string;

  @Expose()
  firstName?: string;

  @Expose()
  lastName?: string;

  @Expose()
  type: UserType;

  @Expose()
  costLimit?: string;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;
}
