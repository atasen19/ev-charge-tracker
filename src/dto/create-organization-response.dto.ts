import { IsString, IsUUID } from 'class-validator';

// Entities & Models
export default class CreateOrganizationResponseDTO {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  costLimit: string;
}
