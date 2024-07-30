import { IsNotEmpty } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly description: string;

  @IsNotEmpty()
  readonly categoriesId: string;

  @IsNotEmpty()
  readonly ville: string;

  @IsNotEmpty()
  readonly prix: number;

  @IsNotEmpty()
  readonly ticket: number;

  @IsNotEmpty()
  readonly date: string;

  @IsNotEmpty()
  readonly file: string;

  @IsNotEmpty()
  readonly numero: string;

  @IsNotEmpty()
  readonly code_events: number;

  readonly webside: string;

  @IsNotEmpty()
  readonly localistion: string;
}
