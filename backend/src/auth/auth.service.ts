import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto';
import { UsersService } from 'src/users/users.service';
import { AuthPayloadDto } from './dto/auth-payload.dto';
import { User } from 'src/users/entities/user.entity';
import { UserRole } from 'src/users/enums/user-role.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<AuthPayloadDto> {
    const user = await this.usersService.findByEmail(dto.email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const validPassword = this.usersService.verifyPassword(
      dto.password,
      user.password,
    );

    if (!validPassword) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const accessToken = this.jwtService.sign({
      sub: user.id,
      email: user.email,
      role: user.role,
    });

    return {
      accessToken,
      user,
    };
  }

  async registerDummy(
    username?: string,
    email?: string,
    password?: string,
  ): Promise<User> {
    const finalUsername = username ?? 'demo';
    const finalEmail = email ?? 'demo@local.test';
    const finalPassword = password ?? 'demo123';

    if (!finalPassword.trim()) {
      throw new BadRequestException('Password cannot be empty');
    }

    const existing = await this.usersService.findByEmail(finalEmail);
    if (existing) {
      return existing;
    }

    const user = await this.usersService.create({
      username: finalUsername,
      email: finalEmail,
      password: finalPassword,
    });

    if (!user.role) {
      user.role = UserRole.USER;
    }

    return user;
  }

  async me(userId: string): Promise<User> {
    const user = await this.usersService.findOne(userId);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }

    return user;
  }
}
