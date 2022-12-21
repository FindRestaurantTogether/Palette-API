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
      accepted: 0,
    });
  }

  getList(uid: string) {
    return this.repository
      .createQueryBuilder('friend')
      .where('friend.uid_src = :uid', { uid: uid })
      .orWhere('friend.uid_dst = :uid', { uid: uid })
      .andWhere('friend.accepted = 1')
      .getMany();
  }

  update(id: number, updateFriendDto: UpdateFriendDto) {
    return `This action updates a #${id} friend`;
  }

  remove(id: number) {
    return `This action removes a #${id} friend`;
  }
}
