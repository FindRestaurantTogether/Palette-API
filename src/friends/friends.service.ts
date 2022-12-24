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

  async request(uid_src: string, uid_dst: string) {
    return await this.repository.insert({
      uid_src: uid_src < uid_dst ? uid_src : uid_dst,
      uid_dst: uid_src < uid_dst ? uid_dst : uid_src,
      isAccepted: false,
    });
  }

  async respond(uid_src: string, uid_dst: string) {
    return await this.repository
      .createQueryBuilder()
      .update(Friend)
      .set({ isAccepted: true })
      .where('uid_src = :uid_src', {
        uid_src: uid_src < uid_dst ? uid_src : uid_dst,
      })
      .andWhere('uid_dst = :uid_dst', {
        uid_dst: uid_src < uid_dst ? uid_dst : uid_src,
      })
      .execute();
  }

  async getList(uid: string) {
    return await this.repository
      .createQueryBuilder('friend')
      .where('friend.uid_src = :uid', { uid: uid })
      .orWhere('friend.uid_dst = :uid', { uid: uid })
      .andWhere('friend.isAccepted = :isAccepted', { isAccepted: true })
      .getMany();
  }

  async remove(deleteFriendDto: DeleteFriendDto) {
    const uid_src = deleteFriendDto.uid_src;
    const uid_dst = deleteFriendDto.uid_dst;

    return await this.repository.delete({
      uid_src: uid_src < uid_dst ? uid_src : uid_dst,
      uid_dst: uid_src < uid_dst ? uid_dst : uid_src,
    });
  }
}
