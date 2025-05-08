import { IsNotEmpty, IsNumber, IsOptional, IsString, IsUUID, MaxLength, MinLength } from "class-validator";

export class CreateCardDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  title: string;

  @IsString()
  @IsOptional()
  @MinLength(2)
  @MaxLength(600)
  description?: string;

  @IsNumber()
  @IsNotEmpty()
  position: number;

  @IsUUID()
  @IsNotEmpty()
  columnId: string;
}
