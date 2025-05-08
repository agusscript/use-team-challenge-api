import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { datasourceOptions } from './config/orm.config';
import { BoardModule } from './module/board/board.module';
import { ColumnModule } from './module/column/column.module';
import { CardModule } from './module/card/card.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...datasourceOptions,
        autoLoadEntities: true,
      }),
    }),
    BoardModule,
    ColumnModule,
    CardModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
