import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { Injectable } from "@nestjs/common";
import { CardService } from "src/module/card/service/card.service";
import { ColumnService } from "src/module/column/service/column.service";

@Injectable()
@WebSocketGateway({ cors: { origin: '*' } })
export class BoardGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly cardService: CardService,
    private readonly columnService: ColumnService,
  ) { }

  emitCardAdded(card: any, columnId: string) {
    this.server.emit('card:added', { card, columnId });
  }

  emitCardUpdated(cardId: string, columnId: string, data: any) {
    this.server.emit('card:updated', { cardId, columnId, data });
  }

  emitCardRemoved(cardId: string, columnId: string) {
    this.server.emit('card:removed', { cardId, columnId });
  }

  emitCardMoved(data: any) {
    this.server.emit('card:moved', data);
  }

  emitColumnAdded(column: any) {
    this.server.emit('column:added', { column });
  }

  emitColumnUpdated(columnId: string, title: string) {
    this.server.emit('column:updated', { columnId, title });
  }

  emitColumnRemoved(columnId: string) {
    this.server.emit('column:removed', { columnId });
  }

  emitBoardUpdated(board: any) {
    this.server.emit('board:update', { board });
  }

  @SubscribeMessage('card:add')
  async handleCardAdd(@MessageBody() data: { title: string, description: string, columnId: string }) {
    try {
      console.log('Añadiendo tarjeta:', data);

      const newCard = await this.cardService.create(data);

      this.emitCardAdded(newCard, data.columnId);

      return { success: true, card: newCard };
    } catch (error) {
      console.error('Error al añadir tarjeta:', error);
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('card:update')
  async handleCardUpdate(@MessageBody() data: { cardId: string, columnId: string, data: any }) {
    try {
      console.log('Actualizando tarjeta:', data);

      const updatedCard = await this.cardService.update(data.cardId, data.data);

      this.emitCardUpdated(data.cardId, data.columnId, data.data);

      return { success: true, card: updatedCard };
    } catch (error) {
      console.error('Error al actualizar tarjeta:', error);
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('card:remove')
  async handleCardRemove(@MessageBody() data: { cardId: string, columnId: string }) {
    try {
      console.log('Eliminando tarjeta:', data);

      await this.cardService.delete(data.cardId);

      this.emitCardRemoved(data.cardId, data.columnId);

      return { success: true };
    } catch (error) {
      console.error('Error al eliminar tarjeta:', error);
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('card:move')
  async handleCardMove(@MessageBody() data: {
    cardId: string,
    sourceColumnId: string,
    destinationColumnId: string
  }) {
    try {
      console.log('Moviendo tarjeta:', data);

      await this.cardService.moveCard(
        data.cardId,
        data.sourceColumnId,
        data.destinationColumnId,
      );

      this.emitCardMoved(data);

      return { success: true };
    } catch (error) {
      console.error('Error al mover tarjeta:', error);
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('column:add')
  async handleColumnAdd(@MessageBody() data: { title: string, boardId: string }) {
    try {
      console.log('Añadiendo columna:', data);

      const newColumn = await this.columnService.create(data);

      this.emitColumnAdded(newColumn);

      return { success: true, column: newColumn };
    } catch (error) {
      console.error('Error al añadir columna:', error);
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('column:update')
  async handleColumnUpdate(@MessageBody() data: { columnId: string, title: string }) {
    try {
      console.log('Actualizando columna:', data);

      const updatedColumn = await this.columnService.update(data.columnId, { title: data.title });

      this.emitColumnUpdated(data.columnId, data.title);

      return { success: true, column: updatedColumn };
    } catch (error) {
      console.error('Error al actualizar columna:', error);
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('column:remove')
  async handleColumnRemove(@MessageBody() data: { columnId: string }) {
    try {
      console.log('Eliminando columna:', data);

      await this.columnService.delete(data.columnId);

      this.emitColumnRemoved(data.columnId);

      return { success: true };
    } catch (error) {
      console.error('Error al eliminar columna:', error);
      return { success: false, error: error.message };
    }
  }

  handleConnection(client: any) {
    console.log(`Cliente conectado: ${client.id}`);
  }

  handleDisconnect(client: any) {
    console.log(`Cliente desconectado: ${client.id}`);
  }
}
