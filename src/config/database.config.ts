import { TypeOrmOptionsFactory, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';

@Injectable()
export class DatabaseConfig implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): Promise<TypeOrmModuleOptions> | TypeOrmModuleOptions {
    return {
      type: 'postgres',
      url: this.configService.get<string>('DATABASE_URL'),
      entities: [__dirname + '/../**/*.entity{.ts,.js}'],
      subscribers: [__dirname + '/../**/*.subscriber{.ts,.js}'],
      migrations: [__dirname + '/../migrations/*{.ts,.js}'],
      namingStrategy: new SnakeNamingStrategy(),
      migrationsRun: true,
      synchronize: true,
      logging:
        this.configService.get<string>('NODE_ENV') === 'development' ||
        this.configService.get<string>('NODE_ENV') === 'test',
      logger: 'file',
    };
  }
}
