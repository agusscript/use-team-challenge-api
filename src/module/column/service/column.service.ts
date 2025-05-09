import { forwardRef, Inject, Injectable } from "@nestjs/common";
import { ColumnRepository } from "../repository/column.repository";
import { Column } from "../entity/column.entity";
import { CreateColumnDto } from "../dto/create-column.dto";
import { ColumnMapper } from "../mapper/column.mapper";
import { BoardService } from "src/module/board/service/board.service";
import { UpdateColumnDto } from "../dto/update-column.dto";
import { BoardGateway } from "src/module/board/gateway/board.gateway";

@Injectable()
export class ColumnService {
  constructor(
    private readonly columnRepository: ColumnRepository,
    private readonly columnMapper: ColumnMapper,

    @Inject(forwardRef(() => BoardService))
    private readonly boardService: BoardService,

    @Inject(forwardRef(() => BoardGateway))
    private boardGateway: BoardGateway,
  ) { }

  async findAll(boardId?: string): Promise<Column[]> {
    return await this.columnRepository.findAll(boardId);
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

    this.boardGateway.emitColumnAdded(mappedColumn);

    return await this.columnRepository.create(mappedColumn);
  }

  async update(
    id: string,
    updateColumnDto: UpdateColumnDto
  ): Promise<Column> {
    const { title } = updateColumnDto;

    const mappedColumn = this.columnMapper.fromUpdateDtoToEntity(
      updateColumnDto
    );

    if (title) {
      this.boardGateway.emitColumnUpdated(id, title);
    }

    return await this.columnRepository.update(id, mappedColumn);
  }

  async delete(id: string): Promise<void> {
    await this.findOneById(id);
    await this.columnRepository.delete(id);
    this.boardGateway.emitColumnRemoved(id);
  }
}
