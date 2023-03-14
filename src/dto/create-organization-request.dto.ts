import { IsString } from 'class-validator';

export default class CreateOrganizationRequestDTO {
  @IsString()
  name: string;

  costLimit: string;
}
