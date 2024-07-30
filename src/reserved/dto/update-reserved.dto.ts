import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateReservedDto {
  @IsNotEmpty()
  @IsString()
  readonly eventId: string;

  @IsNotEmpty()
  @IsString()
  readonly userId: string;
}
