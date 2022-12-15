import { Module } from '@nestjs/common';
import { FriendsService } from './friends.service';
import { FriendsController } from './friends.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Friend } from './entities/friend.entity';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Friend]),
    TypeOrmModule.forFeature([User]),
  ],
  controllers: [FriendsController],
  providers: [FriendsService, UsersService],
})
export class FriendsModule {}
