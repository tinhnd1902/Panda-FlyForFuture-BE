import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    type: 'string',
    description: 'username',
    example: '123456789',
  })
  @IsString()
  @IsNotEmpty()
  public username: string;

  @ApiProperty({
    type: 'string',
    description: 'password',
    example: '123456789',
  })
  @IsString()
  @IsNotEmpty()
  public password: string;
}

export class SignInDto {
  @ApiProperty({
    type: 'string',
    description: 'username or email',
    example: '123456789', // Hoặc có thể là ví dụ email tùy thuộc vào cách bạn xác định đăng nhập
  })
  @IsString()
  @IsNotEmpty()
  public username: string; // Trường này có thể là username hoặc email, tùy thuộc vào cách bạn xác định đăng nhập

  @ApiProperty({
    type: 'string',
    description: 'password',
    example: '123456789',
  })
  @IsString()
  @IsNotEmpty()
  public password: string;
}
