import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { BoardService } from "../service/board.service";
import { Board } from "../entity/board.entity";
import { CreateBoardDto } from "../dto/create-board.dto";
import { UpdateBoardDto } from "../dto/update-board.dto";

@Controller("board")
export class BoardController {
  constructor(private readonly boardService: BoardService) { }

  @Get()
  async findAll(): Promise<Board[]> {
    return this.boardService.findAll();
  }

  @Get(":id")
  async findOneById(@Param("id") id: string): Promise<Board> {
    return this.boardService.findOneById(id);
  }

  @Post()
  async create(
    @Body() createBoardDto: CreateBoardDto): Promise<Board> {
    return this.boardService.create(createBoardDto);
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateBoardDto: UpdateBoardDto
  ): Promise<Board> {
    return this.boardService.update(id, updateBoardDto);
  }

  @Delete(":id")
  async delete(@Param("id") id: string): Promise<void> {
    return this.boardService.delete(id);
  }
}
