import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SocketsService } from './sockets.service';

@WebSocketGateway({})
export class SocketsGateway implements OnModuleInit {
  constructor(private readonly socketsService: SocketsService) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', async (socket) => {
      try {
        const userId = (await this.socketsService.verify(socket)).toString();
        console.log(userId);
        await this.socketsService.createSocket({
          userId: userId,
          socketId: socket.id,
        });
        console.log(1222);
        socket.on('disconnect', () => {
          this.socketsService.deleteSocket(socket.id);
        });
      } catch {}
    });
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any) {
    this.server.emit('onMessage', {
      msg: 'newMessage',
      content: body,
    });
  }
}
