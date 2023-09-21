import { OnModuleInit } from '@nestjs/common';
import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { SocketsService } from './sockets.service';

@WebSocketGateway(3003, {
  // transports: ['websocket'],
  cors: {
    origin: '*',
  },
})
export class SocketsGateway implements OnModuleInit {
  constructor(private readonly socketsService: SocketsService) {}

  @WebSocketServer()
  server: Server;

  onModuleInit() {
    this.server.on('connection', async (socket) => {
      try {
        const userId = await this.socketsService.verify(socket);

        console.log('userId_!11', userId);

        if (!userId || userId === 'null') {
          socket.disconnect();
          console.log('verify error');
          return 'verify error';
        }

        const user = await this.socketsService.getSocketsByUserId(
          userId.username,
        );

        if (user) {
          socket.disconnect();
          console.log('already connected');
          return 'already connected';
        }
        await this.socketsService.createSocket({
          userId: userId.username,
          socketId: socket.id,
        });
      } catch {
        return 'try error';
      }
    });
  }

  @SubscribeMessage('newMessage')
  onNewMessage(@MessageBody() body: any) {
    this.server.emit('onMessage', {
      msg: 'newMessage',
      content: body,
    });
  }

  @SubscribeMessage('deleteSocket')
  deleteSocket(socket) {
    socket.on('disconnect', () => {
      this.socketsService.deleteSocket(socket.id);
      socket.disconnect();
    });
  }
}
