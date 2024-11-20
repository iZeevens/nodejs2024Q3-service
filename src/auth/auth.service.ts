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

  async signUp(createUser: CreateUserDto): Promise<{ token: string }> {
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

    const token = this.jwtService.sign(userData);
    return { token };
  }

  async login(loginUser: CreateUserDto): Promise<{ token: string }> {
    const { login, password } = loginUser;
    const user = await this.usersRepository.findOne({ where: { login } });

    if (!user) {
      throw new UnauthorizedException('Invalid Login or Password');
    }

    const isPasswordMatched = bycrypt.compare(user.password, password);

    if (!isPasswordMatched) {
      throw new UnauthorizedException('Invalid Login or Password');
    }

    const token = this.jwtService.sign({ id: user.id });

    return { token };
  }
}
