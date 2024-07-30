import { IsEmail } from 'class-validator';

export class UpdateUserDto {
  readonly nom: string;
  readonly prenom: string;
  @IsEmail()
  readonly email: string;
  readonly ville: string;
  readonly numero: string;
}
