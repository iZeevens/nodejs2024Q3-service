import { IsString, MinLength } from 'class-validator';

class CreateUserDto {
  @IsString()
  login: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;
}

class UpdatePasswordDto {
  @IsString()
  oldPassword: string;

  @IsString()
  newPassword: string;
}

export { CreateUserDto, UpdatePasswordDto };
