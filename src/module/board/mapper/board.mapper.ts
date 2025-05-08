import { Injectable } from "@nestjs/common";
import { CreateBoardDto } from "../dto/create-board.dto";
import { Board } from "../entity/board.entity";
import { UpdateBoardDto } from "../dto/update-board.dto";

@Injectable()
export class BoardMapper {
  fromDtoToEntity(
    boardDto: CreateBoardDto | UpdateBoardDto
  ): Board {
    const board = new Board();

    board.title = boardDto.title;

    return board;
  }
}
