import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User as UserEntity } from 'src/restServices/users/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/restServices/users/dto/users.dto';
import * as bycrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private usersRepository: Repository<UserEntity>,
    private jwtService: JwtService,
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

    await this.jwtService.signAsync(userData);
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

    const token = await this.jwtService.signAsync({ id: user.id });

    return { accessToken: token };
  }
}
