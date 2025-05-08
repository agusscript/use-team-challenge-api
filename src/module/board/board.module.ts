import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Board } from "./entity/board.entity";
import { BoardService } from "./service/board.service";
import { BoardRepository } from "./repository/board.repository";
import { BoardMapper } from "./mapper/board.mapper";
import { BoardController } from "./controller/board.controller";

@Module({
  imports: [TypeOrmModule.forFeature([Board])],
  controllers: [BoardController],
  providers: [BoardService, BoardRepository, BoardMapper],
  exports: [BoardService]
})
export class BoardModule { }
