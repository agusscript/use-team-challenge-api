import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Board } from '../entity/board.entity';

@Injectable()
export class BoardRepository {
  constructor(
    @InjectRepository(Board)
    private readonly repository: Repository<Board>
  ) { }

  async findAll(): Promise<Board[]> {
    return await this.repository.find({
      relations: { columns: { cards: true } },
    });
  }

  async findOneById(id: string): Promise<Board> {
    const board = await this.repository.findOne({
      where: { id },
      relations: { columns: { cards: true } },
    });

    if (!board) {
      throw new NotFoundException(`Board with ID ${id} not found`);
    }

    return board;
  }

  async create(board: Board): Promise<Board> {
    return await this.repository.save(board);
  }

  async update(id: string, updates: Partial<Board>): Promise<Board> {
    const boardToUpdate = await this.repository.preload({
      ...updates,
      id,
    });

    if (!boardToUpdate) {
      throw new NotFoundException(`Board with ID ${id} not found`);
    }

    return await this.repository.save(boardToUpdate);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
