import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { FlyforfutureService } from './flyforfuture.service';

@Controller('flyforfuture')
export class FlyforfutureController {
  constructor(private readonly flyforfutureService: FlyforfutureService) {}
}
