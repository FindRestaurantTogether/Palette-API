import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Friend } from './entities/friend.entity';
import { DeleteFriendDto } from './dto/delete-friend.dto';

@Injectable()
export class FriendsService {
  constructor(
    @InjectRepository(Friend) private repository: Repository<Friend>,
  ) {}

  async create(uid_src: string, uid_dst: string) {
    return await this.repository.insert({
      uid_src: uid_src < uid_dst ? uid_src : uid_dst,
      uid_dst: uid_src < uid_dst ? uid_dst : uid_src,
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

  remove(deleteFriendDto: DeleteFriendDto) {
    const uid_src = deleteFriendDto.uid_src;
    const uid_dst = deleteFriendDto.uid_dst;

    return this.repository.delete({
      uid_src: uid_src < uid_dst ? uid_src : uid_dst,
      uid_dst: uid_src < uid_dst ? uid_dst : uid_src,
    });
  }
}
