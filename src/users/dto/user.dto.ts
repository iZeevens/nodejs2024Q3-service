import { IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  login: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}
