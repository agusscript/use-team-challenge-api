import { Body, Controller, Delete, Get, Param, Patch, Post } from "@nestjs/common";
import { ColumnService } from "../service/column.service";
import { Column } from "../entity/column.entity";
import { CreateColumnDto } from "../dto/create-column.dto";
import { UpdateColumnDto } from "../dto/update-column.dto";

@Controller("column")
export class ColumnController {
  constructor(private readonly columnService: ColumnService) { }

  @Get()
  async findAll(): Promise<Column[]> {
    return this.columnService.findAll();
  }

  @Get(":id")
  async findOneById(@Param("id") id: string): Promise<Column> {
    return this.columnService.findOneById(id);
  }

  @Post()
  async create(
    @Body() createColumnDto: CreateColumnDto
  ): Promise<Column> {
    return this.columnService.create(
      createColumnDto,
    );
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateColumnDto: UpdateColumnDto
  ): Promise<Column> {
    return this.columnService.update(id, updateColumnDto);
  }

  @Delete(":id")
  async delete(@Param("id") id: string): Promise<void> {
    return this.columnService.delete(id);
  }
}
