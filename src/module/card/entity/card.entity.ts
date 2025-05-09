import {
  Entity,
  PrimaryGeneratedColumn,
  Column as ColumnDecorator,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Column } from 'src/module/column/entity/column.entity';

@Entity()
export class Card {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ColumnDecorator()
  title: string;

  @ColumnDecorator({ type: 'text', nullable: true })
  description: string;

  @ManyToOne(() => Column, column => column.cards, {
    nullable: false,
    onDelete: 'CASCADE'
  })
  column: Column;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
