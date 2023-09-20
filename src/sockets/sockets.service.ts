import { InjectRepository } from '@nestjs/typeorm';
import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import * as jwt from 'jsonwebtoken';
import { Sockets } from './sockets.entity';

@Injectable()
export class SocketsService {
  constructor(
    @InjectRepository(Sockets)
    private readonly socketsRepository: Repository<Sockets>,
  ) {
    this.socketsRepository.clear();
  }
  async verify(socket) {
    try {
      // console.log(
      //   'socket.handshake.headers.authorization',
      //   socket.handshake.headers.authorization,
      // );
      const payload = jwt.decode(socket.handshake.headers.authorization) as any;

      console.log('payload', payload);

      if (!payload) {
        socket.disconnect();
        return 'null';
      }

      return payload;
    } catch {
      socket.disconnect();
    }
  }

  async getSocketsByUserId(userId: string): Promise<Sockets> {
    return this.socketsRepository.findOneBy({
      userId: userId,
    });
  }

  async createSocket(socket: {
    userId: string;
    socketId: string;
  }): Promise<Sockets> {
    return this.socketsRepository.save(socket);
  }

  async deleteSocket(socketId: string): Promise<void> {
    await this.socketsRepository.delete({
      socketId: socketId,
    });
  }
}
