import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User as UserEntity } from 'src/restServices/users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/restServices/users/dto/users.dto';
import * as bycrypt from 'bcrypt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async signUp(createUser: CreateUserDto) {
    const { login, password } = createUser;

    const hashedPassword = await bycrypt.hash(password, 10);
    const userData = {
      login,
      password: hashedPassword,
      version: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    const user = this.usersRepository.create(userData);
    await this.usersRepository.save(user);

    await this.getTokens(user.id);
    return user;
  }

  async login(loginUser: CreateUserDto): Promise<{ accessToken: string }> {
    const { login, password } = loginUser;
    const user = await this.usersRepository.findOne({ where: { login } });

    if (!user) {
      throw new UnauthorizedException('Invalid Login or Password');
    }

    const isPasswordMatched = await bycrypt.compare(password, user.password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid Login or Password');
    }

    const tokens = await this.getTokens(user.id);

    return tokens;
  }

  private async getTokens(id: string) {
    const [accessToken, refreshToken] = await Promise.all([
      await this.jwtService.signAsync(
        { id },
        {
          secret: this.configService.get('JWT_SECRET_KEY'),
          expiresIn: this.configService.get('TOKEN_EXPIRE_TIME'),
        },
      ),
      await this.jwtService.signAsync(
        { id },
        {
          secret: this.configService.get('JWT_SECRET_REFRESH_KEY'),
          expiresIn: this.configService.get('TOKEN_REFRESH_EXPIRE_TIME'),
        },
      ),
    ]);

    return { accessToken, refreshToken };
  }
}
