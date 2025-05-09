import { Injectable } from "@nestjs/common";
import { CreateColumnDto } from "../dto/create-column.dto";
import { Column } from "../entity/column.entity";
import { Board } from "src/module/board/entity/board.entity";
import { UpdateColumnDto } from "../dto/update-column.dto";

@Injectable()
export class ColumnMapper {
  fromCreateDtoToEntity(
    createColumnDto: CreateColumnDto,
    board: Board
  ): Column {
    const column = new Column();

    column.title = createColumnDto.title;
    column.board = board;

    return column;
  }

  fromUpdateDtoToEntity(
    updateColumnDto: UpdateColumnDto,
  ): Column {
    const column = new Column();

    column.title = updateColumnDto.title;

    return column;
  }
}
