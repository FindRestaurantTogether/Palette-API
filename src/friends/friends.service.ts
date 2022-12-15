import { Injectable } from '@nestjs/common';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Friend } from './entities/friend.entity';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(Friend) private repository: Repository<Friend>,
  ) {}

  async create(uid_src: string, uid_dst: string) {
    return await this.repository.insert({
      uid_src: uid_src,
      uid_dst: uid_dst,
      accepted: 1,
    });
  }

  findAll() {
    return `This action returns all friends`;
  }

  findOne(id: number) {
    return `This action returns a #${id} friend`;
  }

  update(id: number, updateFriendDto: UpdateFriendDto) {
    return `This action updates a #${id} friend`;
  }

  remove(id: number) {
    return `This action removes a #${id} friend`;
  }
}
