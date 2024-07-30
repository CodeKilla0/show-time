import { IsNotEmpty, IsString } from 'class-validator';

export class CreateReservedDto {
  @IsNotEmpty()
  @IsString()
  readonly eventId: string;

  @IsNotEmpty()
  @IsString()
  readonly userId: string;
}
