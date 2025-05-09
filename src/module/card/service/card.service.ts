import { forwardRef, Inject, Injectable, NotFoundException } from "@nestjs/common";
import { CardRepository } from "../repository/card.repository";
import { Card } from "../entity/card.entity";
import { CreateCardDto } from "../dto/create-card.dto";
import { CardMapper } from "../mapper/card.mapper";
import { ColumnService } from "src/module/column/service/column.service";
import { UpdateCardDto } from "../dto/update-card.dto";
import { BoardGateway } from "src/module/board/gateway/board.gateway";
import { DataSource } from "typeorm";

@Injectable()
export class CardService {
  constructor(
    private readonly cardRepository: CardRepository,
    private readonly cardMapper: CardMapper,
    private readonly columnService: ColumnService,
    
    @Inject(forwardRef(() => BoardGateway))
    private readonly boardGateway: BoardGateway,

    private readonly dataSource: DataSource,
  ) { }

  async findAll(columnId?: string): Promise<Card[]> {
    return await this.cardRepository.findAll(columnId);
  }

  async findOneById(id: string): Promise<Card> {
    return await this.cardRepository.findOneById(id);
  }

  async create(createCardDto: CreateCardDto): Promise<Card> {
    const { columnId } = createCardDto;

    const column = await this.columnService.findOneById(
      columnId
    );

    const mappedCard = this.cardMapper.fromDtoToEntity(
      createCardDto,
      column
    );

    this.boardGateway.emitCardAdded(mappedCard, columnId);
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

    this.boardGateway.emitCardUpdated(
      id,
      mappedCard.column.id,
      updateCardDto
    );

    return await this.cardRepository.update(id, mappedCard);
  }

  async delete(id: string): Promise<void> {
    const card = await this.findOneById(id);
    const columnId = card.column.id;

    await this.cardRepository.delete(id);
    this.boardGateway.emitCardRemoved(id, columnId);
  }

  async moveCard(
    cardId: string,
    sourceColumnId: string,
    destinationColumnId: string
  ): Promise<void> {
    const card = await this.cardRepository.findOneById(cardId);
  
    const sourceColumn = await this.columnService.findOneById(sourceColumnId);
    const destinationColumn = await this.columnService.findOneById(destinationColumnId);
  
    if (!sourceColumn || !destinationColumn) {
      throw new NotFoundException('Source or destination column not found');
    }
  
    await this.dataSource.manager.transaction(async (manager) => {
      if (sourceColumnId !== destinationColumnId) {
        card.column = destinationColumn;
        await manager.save(card);
      }
    });
  
    this.boardGateway.emitCardMoved({
      cardId,
      sourceColumnId,
      destinationColumnId,
    });
  } 
}
