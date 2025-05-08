import { Injectable } from "@nestjs/common";
import { CardRepository } from "../repository/card.repository";
import { Card } from "../entity/card.entity";
import { CreateCardDto } from "../dto/create-card.dto";
import { CardMapper } from "../mapper/card.mapper";
import { ColumnService } from "src/module/column/service/column.service";
import { UpdateCardDto } from "../dto/update-card.dto";

@Injectable()
export class CardService {
  constructor(
    private readonly cardRepository: CardRepository,
    private readonly cardMapper: CardMapper,
    private readonly columnService: ColumnService,
  ) { }

  async findAll(): Promise<Card[]> {
    return await this.cardRepository.findAll();
  }

  async findOneById(id: string): Promise<Card> {
    return await this.cardRepository.findOneById(id);
  }

  async create(createCardDto: CreateCardDto): Promise<Card> {
    const column = await this.columnService.findOneById(
      createCardDto.columnId
    );

    const mappedCard = this.cardMapper.fromDtoToEntity(
      createCardDto,
      column
    );

    return await this.cardRepository.create(mappedCard);
  }

  async update(id: string, updateCardDto: UpdateCardDto): Promise<Card> {
    const column = await this.columnService.findOneById(
      updateCardDto.columnId
    );

    const mappedCard = this.cardMapper.fromDtoToEntity(
      updateCardDto,
      column
    );

    return await this.cardRepository.update(id, mappedCard);
  }

  async delete(id: string): Promise<void> {
    return await this.cardRepository.delete(id);
  }
}
