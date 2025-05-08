import { IsNotEmpty, IsString, MaxLength, MinLength } from "class-validator";

export class CreateBoardDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(2)
  @MaxLength(50)
  title: string;
}
