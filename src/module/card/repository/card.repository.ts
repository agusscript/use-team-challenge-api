import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Card } from '../entity/card.entity';

@Injectable()
export class CardRepository {
  constructor(
    @InjectRepository(Card)
    private readonly repository: Repository<Card>
  ) { }

  async findAll(columnId?: string): Promise<Card[]> {
    const where = columnId ? { column: { id: columnId } } : {};

    return await this.repository.find({
      where,
    });
  }

  async findOneById(id: string): Promise<Card> {
    const card = await this.repository.findOne({
      where: { id },
      relations: { column: true },
    });

    if (!card) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }

    return card;
  }

  async create(card: Card): Promise<Card> {
    return await this.repository.save(card);
  }

  async update(id: string, updates: Partial<Card>): Promise<Card> {
    const cardToUpdate = await this.repository.preload({
      ...updates,
      id,
    });

    if (!cardToUpdate) {
      throw new NotFoundException(`Card with ID ${id} not found`);
    }

    return await this.repository.save(cardToUpdate);
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
