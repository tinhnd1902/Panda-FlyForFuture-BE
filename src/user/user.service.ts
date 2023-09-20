import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const checkUser = await this.findOneByUsername(createUserDto.username);

    if (checkUser)
      throw new HttpException(
        'Username already exists',
        HttpStatus.BAD_REQUEST,
      );

    await this.userRepository.save({
      ...createUserDto,
      createAt: new Date(),
    });

    return 'Created successfully';
  }

  findOneByUsername(username: string) {
    return this.userRepository.findOne({
      where: {
        username: username,
      },
    });
  }
}
