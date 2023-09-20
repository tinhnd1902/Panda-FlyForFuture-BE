import { Module } from '@nestjs/common';
import { SocketsService } from './sockets.service';
import { SocketsGateway } from './sockets.gateway';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sockets } from './sockets.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Sockets])],
  providers: [SocketsGateway, SocketsService],
  exports: [SocketsService, SocketsGateway],
})
export class SocketsModule {}
