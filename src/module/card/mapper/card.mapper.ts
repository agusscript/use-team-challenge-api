import { Injectable } from "@nestjs/common";
import { CreateCardDto } from "../dto/create-card.dto";
import { Card } from "../entity/card.entity";
import { Column } from "src/module/column/entity/column.entity";
import { UpdateCardDto } from "../dto/update-card.dto";

@Injectable()
export class CardMapper {
  fromDtoToEntity(
    cardDto: CreateCardDto | UpdateCardDto,
    column: Column
  ): Card {
    const card = new Card();

    card.title = cardDto.title;
    card.description = cardDto.description;
    card.column = column;

    return card;
  }
}
