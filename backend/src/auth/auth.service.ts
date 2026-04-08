import {
  BadRequestException,
  ForbiddenException,
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
    role?: UserRole,
  ): Promise<User> {
    const allowDummyRegister =
      process.env.ALLOW_DUMMY_REGISTER === 'true' || process.env.NODE_ENV !== 'production';
    if (!allowDummyRegister) {
      throw new ForbiddenException('Dummy registration is disabled');
    }

    const allowDummyAdmin = process.env.ALLOW_DUMMY_ADMIN === 'true';
    if (role && role !== UserRole.USER && !allowDummyAdmin) {
      throw new ForbiddenException(
        'Admin role assignment via registerDummy is disabled',
      );
    }

    const finalUsername = username ?? 'demo';
    const finalEmail = email ?? 'demo@local.test';
    const finalPassword = password ?? 'demo123';

    if (!finalPassword.trim()) {
      throw new BadRequestException('Password cannot be empty');
    }

    const existing = await this.usersService.findByEmail(finalEmail);
    if (existing) {
      if (role && existing.role !== role) {
        return this.usersService.updateRole(existing.id, role);
      }
      return existing;
    }

    const user = await this.usersService.create({
      username: finalUsername,
      email: finalEmail,
      password: finalPassword,
    });

    if (role && role !== UserRole.USER) {
      user.role = role;
      return this.usersService.updateRole(user.id, role);
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
