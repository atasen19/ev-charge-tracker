import { Expose } from 'class-transformer';
import { IsEnum, IsString, IsUUID } from 'class-validator';
import { UserType } from '../models/user.model';

export default class CreateUserRequestDTO {
  @Expose()
  @IsUUID()
  @IsString()
  id: string;

  @Expose()
  @IsUUID()
  @IsString()
  organizationId: string;

  @Expose()
  @IsEnum(UserType)
  type?: UserType;

  @Expose()
  costLimit: string;
}
