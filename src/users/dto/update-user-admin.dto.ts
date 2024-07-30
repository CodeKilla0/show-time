import { IsBoolean } from 'class-validator';

export class UpdateUserAdminDto {
  @IsBoolean()
  readonly admin: boolean;
}
