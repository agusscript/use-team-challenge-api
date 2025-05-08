import {
  Column as ColumnDecorator,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn
} from "typeorm";
import { Column } from "src/module/column/entity/column.entity";

@Entity({ name: "board" })
export class Board {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ColumnDecorator()
  title: string;

  @OneToMany(() => Column, column => column.board, {
    cascade: true,
    onDelete: 'CASCADE'
  })
  columns: Column[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
