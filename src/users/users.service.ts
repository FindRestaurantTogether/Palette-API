import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private repository: Repository<User>) {}

  async create(createUserDto: CreateUserDto) {
    try {
      return await this.repository.insert(createUserDto);
    } catch (error) {
      if (error.code === 'ER_DUP_ENTRY') {
        console.log(error);
        return '중복된 uid입니다.';
      }
    }
  }

  async findAll() {
    return await this.repository.find();
  }

  async findUid(uid: string) {
    const check = await this.repository.findOne({
      where: { uid: uid },
    });
    if (!check) {
      throw new NotFoundException('해당 uid의 사용자가 없습니다.');
    }
    return check.uid;
  }

  async findUidByEmail(email: string) {
    const uid = await this.repository.findOne({
      where: { email: email },
    });
    if (!uid) {
      throw new NotFoundException('해당 email의 사용자가 없습니다.');
    }
    return uid.uid;
  }

  async updateName(updateUserDto: UpdateUserDto) {
    return this.repository.update(updateUserDto.uid, {
      name: updateUserDto.name,
    });
  }

  async remove(uid: string) {
    return await this.repository.delete(uid);
  }
}
