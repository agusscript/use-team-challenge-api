import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from "@nestjs/common";
import { CardService } from "../service/card.service";
import { Card } from "../entity/card.entity";
import { CreateCardDto } from "../dto/create-card.dto";
import { UpdateCardDto } from "../dto/update-card.dto";

@Controller("card")
export class CardController {
  constructor(private readonly cardService: CardService) { }

  @Get()
  async getAll(
    @Query('columnId') columnId?: string
  ): Promise<Card[]> {
    return await this.cardService.findAll(columnId);
  }

  @Get(":id")
  async findOneById(@Param("id") id: string): Promise<Card> {
    return this.cardService.findOneById(id);
  }

  @Post()
  async create(
    @Body() createCardDto: CreateCardDto): Promise<Card> {
    return this.cardService.create(createCardDto);
  }

  @Patch(":id")
  async update(
    @Param("id") id: string,
    @Body() updateCardDto: UpdateCardDto
  ): Promise<Card> {
    return this.cardService.update(id, updateCardDto);
  }

  @Delete(":id")
  async delete(@Param("id") id: string): Promise<void> {
    return this.cardService.delete(id);
  }

  @Post(':id/move')
  moveCard(
    @Param('id') id: string,
    @Body() moveCardDto: { 
      sourceColumnId: string; 
      destinationColumnId: string;
    }
  ) {
    return this.cardService.moveCard(
      id,
      moveCardDto.sourceColumnId,
      moveCardDto.destinationColumnId
    );
  }
}
