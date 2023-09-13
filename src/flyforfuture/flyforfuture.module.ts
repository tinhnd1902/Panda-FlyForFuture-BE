import { Module } from '@nestjs/common';
import { FlyforfutureService } from './flyforfuture.service';
import { FlyforfutureController } from './flyforfuture.controller';

@Module({
  controllers: [FlyforfutureController],
  providers: [FlyforfutureService],
})
export class FlyforfutureModule {}
