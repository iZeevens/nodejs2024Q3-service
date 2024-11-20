import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/restServices/users/dto/users.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  signUp(@Body() body: CreateUserDto): Promise<{ token: string }> {
    return this.authService.signUp(body);
  }

  @Post('login')
  login(@Body() body: CreateUserDto): Promise<{ token: string }> {
    return this.authService.login(body);
  }
}
