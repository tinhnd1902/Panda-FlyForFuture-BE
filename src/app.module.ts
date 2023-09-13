import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SocketsModule } from './sockets/sockets.module';
import { DatabaseConfig } from './config/database.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { FlyforfutureModule } from './flyforfuture/flyforfuture.module';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({ useClass: DatabaseConfig }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    SocketsModule,
    FlyforfutureModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
