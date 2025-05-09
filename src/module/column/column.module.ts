import { forwardRef, Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Column } from "./entity/column.entity";
import { ColumnService } from "./service/column.service";
import { ColumnRepository } from "./repository/column.repository";
import { ColumnMapper } from "./mapper/column.mapper";
import { ColumnController } from "./controller/column.controller";
import { BoardModule } from "../board/board.module";

@Module({
  imports: [
    TypeOrmModule.forFeature([Column]),
    forwardRef(() => BoardModule),
  ],
  controllers: [ColumnController],
  providers: [ColumnService, ColumnRepository, ColumnMapper],
  exports: [ColumnService]
})
export class ColumnModule { }
