import { IsNotEmpty } from 'class-validator';

export class CreateCategoriesDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly description: string;
}
