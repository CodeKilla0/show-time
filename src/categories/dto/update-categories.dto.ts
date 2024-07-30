import { IsNotEmpty } from 'class-validator';

export class UpdateCategoriesDto {
  @IsNotEmpty()
  readonly title: string;

  @IsNotEmpty()
  readonly description: string;
}
