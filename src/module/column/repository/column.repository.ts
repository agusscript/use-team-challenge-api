import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Column } from '../entity/column.entity';

@Injectable()
export class ColumnRepository {
  constructor(
    @InjectRepository(Column)
    private readonly repository: Repository<Column>
  ) { }

  async findAll(boardId?: string): Promise<Column[]> {
    const where = boardId ? { board: { id: boardId } } : {};
  
    return await this.repository.find({
      where,
      relations: { cards: true },
    });
  }  

  async findOneById(id: string): Promise<Column> {
    const column = await this.repository.findOne({
      where: { id },
      relations: { cards: true }
    });

    if (!column) {
      throw new NotFoundException(`Column with ID ${id} not found`);
    }

    return column;
  }

  async create(column: Column): Promise<Column> {
    return await this.repository.save(column);
  }

  async update(id: string, updates: Partial<Column>): Promise<Column> {
    const columnToUpdate = await this.repository.preload({
      ...updates,
      id,
    });

    if (!columnToUpdate) {
      throw new NotFoundException(`Column with ID ${id} not found`);
    }

    return await this.repository.save(columnToUpdate);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
