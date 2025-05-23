import { MessageBody, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";
import { Injectable } from "@nestjs/common";
import { CardService } from "src/module/card/service/card.service";

@Injectable()
@WebSocketGateway({ cors: { origin: '*' } })
export class BoardGateway {
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly cardService: CardService,
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
      console.info('Card added:', data);
      this.emitCardAdded(data, data.columnId);

      return { success: true, card: data };
    } catch (error) {
      console.error('Error adding card:', error);
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('card:update')
  async handleCardUpdate(@MessageBody() data: { cardId: string, columnId: string, data: any }) {
    try {
      console.info('Card updated:', data);
      this.emitCardUpdated(data.cardId, data.columnId, data.data);

      return { success: true, card: data };
    } catch (error) {
      console.error('Error updating card:', error);
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('card:remove')
  async handleCardRemove(@MessageBody() data: { cardId: string, columnId: string }) {
    try {
      console.info('Card removed:', data);
      this.emitCardRemoved(data.cardId, data.columnId);

      return { success: true };
    } catch (error) {
      console.error('Error removing card:', error);
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
      console.info('Card moved:', data);

      await this.cardService.moveCard(
        data.cardId,
        data.sourceColumnId,
        data.destinationColumnId,
      );

      this.emitCardMoved(data);

      return { success: true };
    } catch (error) {
      console.error('Error moving card:', error);
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('column:add')
  async handleColumnAdd(@MessageBody() data: { title: string, boardId: string }) {
    try {
      console.info('Column added:', data);
      this.emitColumnAdded(data);

      return { success: true, column: data };
    } catch (error) {
      console.error('Error adding column:', error);
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('column:update')
  async handleColumnUpdate(@MessageBody() data: { columnId: string, title: string }) {
    try {
      console.info('Column updated:', data);
      this.emitColumnUpdated(data.columnId, data.title);

      return { success: true, column: data };
    } catch (error) {
      console.error('Error updating column:', error);
      return { success: false, error: error.message };
    }
  }

  @SubscribeMessage('column:remove')
  async handleColumnRemove(@MessageBody() data: { columnId: string }) {
    try {
      console.info('Column removed:', data);
      this.emitColumnRemoved(data.columnId);

      return { success: true };
    } catch (error) {
      console.error('Error removing column:', error);
      return { success: false, error: error.message };
    }
  }

  handleConnection(client: any) {
    console.info(`Cliente conectado: ${client.id}`);
  }

  handleDisconnect(client: any) {
    console.info(`Cliente desconectado: ${client.id}`);
  }
}
