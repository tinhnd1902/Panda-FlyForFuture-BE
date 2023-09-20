import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly usersService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(body: any) {
    const checkUser = await this.usersService.findOneByUsername(body.username);
    if (!checkUser) {
      throw new HttpException('Username not exists', HttpStatus.BAD_REQUEST);
    }
    if (checkUser.password !== body.password) {
      throw new HttpException('Password is wrong', HttpStatus.BAD_REQUEST);
    }

    // console.log(body);
    // const payload = { username: body.username, password: body.password };

    return {
      access_token: this.jwtService.sign(body),
      username: body.username,
    };
  }
}
