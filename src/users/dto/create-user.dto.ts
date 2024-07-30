import { IsNotEmpty, IsEmail } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty()
  readonly nom: string;

  @IsNotEmpty()
  readonly prenom: string;

  @IsNotEmpty()
  @IsEmail()
  readonly email: string;

  @IsNotEmpty()
  readonly ville: string;

  @IsNotEmpty()
  readonly numero: string;

  @IsNotEmpty()
  readonly password: string;

  readonly active: number;

  readonly admin: boolean;
}
