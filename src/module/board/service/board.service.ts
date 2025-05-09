import { Injectable } from "@nestjs/common";
import { BoardRepository } from "../repository/board.repository";
import { Board } from "../entity/board.entity";
import { BoardMapper } from "../mapper/board.mapper";
import { CreateBoardDto } from "../dto/create-board.dto";
import { UpdateBoardDto } from "../dto/update-board.dto";
import { BoardGateway } from "../gateway/board.gateway";

@Injectable()
export class BoardService {
  constructor(
    private readonly boardRepository: BoardRepository,
    private readonly boardMapper: BoardMapper,
    private boardGateway: BoardGateway,
  ) { }

  async findAll(): Promise<Board[]> {
    return await this.boardRepository.findAll();
  }

  async findOneById(id: string): Promise<Board> {
    return await this.boardRepository.findOneById(id);
  }

  async create(createBoardDto: CreateBoardDto): Promise<Board> {
    const mappedBoard = this.boardMapper.fromDtoToEntity(createBoardDto);

    this.boardGateway.emitBoardUpdated(mappedBoard);

    return await this.boardRepository.create(mappedBoard);
  }

  async update(id: string, updateBoardDto: UpdateBoardDto): Promise<Board> {
    const mappedBoard = this.boardMapper.fromDtoToEntity(updateBoardDto);

    this.boardGateway.emitBoardUpdated(mappedBoard);

    return await this.boardRepository.update(id, mappedBoard);
  }

  async delete(id: string): Promise<void> {
    return await this.boardRepository.delete(id);
  }
}
