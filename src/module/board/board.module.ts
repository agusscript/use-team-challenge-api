import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Board } from "./entity/board.entity";
import { BoardService } from "./service/board.service";
import { BoardRepository } from "./repository/board.repository";
import { BoardMapper } from "./mapper/board.mapper";
import { BoardController } from "./controller/board.controller";
import { BoardGateway } from "./gateway/board.gateway";
import { CardModule } from "../card/card.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Board]),
    forwardRef(() => CardModule),
  ],
  controllers: [BoardController],
  providers: [
    BoardService,
    BoardRepository,
    BoardMapper,
    BoardGateway
  ],
  exports: [BoardService, BoardGateway]
})
export class BoardModule { }
