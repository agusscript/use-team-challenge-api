import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Card } from "./entity/card.entity";
import { CardService } from "./service/card.service";
import { CardRepository } from "./repository/card.repository";
import { CardMapper } from "./mapper/card.mapper";
import { CardController } from "./controller/card.controller";
import { ColumnModule } from "../column/column.module";

@Module({
  imports: [TypeOrmModule.forFeature([Card]), ColumnModule],
  controllers: [CardController],
  providers: [CardService, CardRepository, CardMapper],
  exports: []
})
export class CardModule { }
