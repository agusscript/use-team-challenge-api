import { IsNotEmpty, IsNumber, IsString, IsUUID, MaxLength, MinLength } from "class-validator";

export class CreateColumnDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(255)
  title: string;

  @IsNumber()
  @IsNotEmpty()
  position: number;

  @IsUUID()
  @IsNotEmpty()
  boardId: string;
}
