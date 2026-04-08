import { Injectable } from '@nestjs/common';
import { randomBytes, scryptSync, timingSafeEqual } from 'node:crypto';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserRole } from './enums/user-role.enum';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private repo: Repository<User>,
  ) {}

  create(dto: CreateUserDto) {
    const user = this.repo.create({
      username: dto.username,
      email: dto.email,
      password: this.hashPassword(dto.password),
      role: UserRole.USER,
    });
    return this.repo.save(user);
  }

  findAll() {
    return this.repo.find();
  }

  findOne(id: string) {
    return this.repo.findOneBy({ id });
  }

  findByEmail(email: string) {
    return this.repo.findOneBy({ email });
  }

  update(id: string, dto: UpdateUserDto) {
    const payload = dto.password
      ? { ...dto, password: this.hashPassword(dto.password) }
      : dto;

    return this.repo.update(id, payload);
  }

  remove(id: string) {
    return this.repo.delete(id);
  }

  hashPassword(password: string) {
    const salt = randomBytes(16).toString('hex');
    const passwordHash = scryptSync(password, salt, 64).toString('hex');
    return `${salt}:${passwordHash}`;
  }

  verifyPassword(password: string, storedHash: string) {
    const [salt, hash] = storedHash.split(':');
    if (!salt || !hash) {
      return false;
    }

    const computedHash = scryptSync(password, salt, 64).toString('hex');
    return timingSafeEqual(Buffer.from(computedHash), Buffer.from(hash));
  }
}
