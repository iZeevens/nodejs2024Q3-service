import { Injectable } from '@nestjs/common';
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

    const user = this.usersRepository.create({
      login,
      password: hashedPassword,
      version: 1,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    await this.usersRepository.save(user);

    const token = this.jwtService.sign(user);

    return { token };
  }
}
