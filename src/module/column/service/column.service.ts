import { Injectable } from "@nestjs/common";
import { ColumnRepository } from "../repository/column.repository";
import { Column } from "../entity/column.entity";
import { CreateColumnDto } from "../dto/create-column.dto";
import { ColumnMapper } from "../mapper/column.mapper";
import { BoardService } from "src/module/board/service/board.service";
import { UpdateColumnDto } from "../dto/update-column.dto";

@Injectable()
export class ColumnService {
  constructor(
    private readonly columnRepository: ColumnRepository,
    private readonly columnMapper: ColumnMapper,
    private readonly boardService: BoardService,
  ) { }

  async findAll(): Promise<Column[]> {
    return await this.columnRepository.findAll();
  }

  async findOneById(id: string): Promise<Column> {
    return await this.columnRepository.findOneById(id);
  }

  async create(createColumnDto: CreateColumnDto): Promise<Column> {
    const board = await this.boardService.findOneById(
      createColumnDto.boardId
    );

    const mappedColumn = this.columnMapper.fromCreateDtoToEntity(
      createColumnDto,
      board
    );

    return await this.columnRepository.create(mappedColumn);
  }

  async update(
    id: string,
    updateColumnDto: UpdateColumnDto
  ): Promise<Column> {
    const mappedColumn = this.columnMapper.fromUpdateDtoToEntity(
      updateColumnDto
    );

    return await this.columnRepository.update(id, mappedColumn);
  }

  async delete(id: string): Promise<void> {
    return await this.columnRepository.delete(id);
  }
}
