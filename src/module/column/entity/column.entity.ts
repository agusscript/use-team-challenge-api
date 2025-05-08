import {
  Entity,
  PrimaryGeneratedColumn,
  Column as ColumnDecorator,
  ManyToOne,
  OneToMany,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn
} from "typeorm";
import { Board } from "src/module/board/entity/board.entity";
import { Card } from "src/module/card/entity/card.entity";

@Entity({ name: "column" })
export class Column {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ColumnDecorator()
  title: string;

  @ColumnDecorator()
  position: number;

  @ManyToOne(() => Board, board => board.columns, {
    nullable: false,
    onDelete: 'CASCADE'
  })
  board: Board;

  @OneToMany(() => Card, card => card.column, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  cards: Card[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
