import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from 'src/restServices/users/dto/users.dto';
import { Public } from './auth.public';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('signup')
  signUp(@Body() body: CreateUserDto) {
    return this.authService.signUp(body);
  }

  @Public()
  @Post('login')
  login(@Body() body: CreateUserDto): Promise<{ accessToken: string }> {
    return this.authService.login(body);
  }
}
