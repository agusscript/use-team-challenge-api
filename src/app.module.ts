import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { datasourceOptions } from './config/orm.config';
import { BoardModule } from './module/board/board.module';
import { ColumnModule } from './module/column/column.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        ...datasourceOptions,
        autoLoadEntities: true,
      }),
    }),
    BoardModule,
    ColumnModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
