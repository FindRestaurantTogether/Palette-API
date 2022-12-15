import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { FriendsService } from './friends.service';
import { CreateFriendDto } from './dto/create-friend.dto';
import { UpdateFriendDto } from './dto/update-friend.dto';
import { ApiProperty, ApiTags } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';

@ApiTags('Friends')
@Controller('api/friends')
export class FriendsController {
  constructor(
    private readonly usersService: UsersService,
    private readonly friendsService: FriendsService,
  ) {}

  @ApiProperty({
    description: '친구 요청',
  })
  @Post()
  async create(@Body() createFriendDto: CreateFriendDto) {
    const uid_src = await this.usersService.findUid(createFriendDto.uid_src);
    const uid_dst = await this.usersService.findUidByEmail(
      createFriendDto.email_dst,
    );
    if (!uid_src || !uid_dst) {
      return { message: '존재하지 않는 사용자입니다.' };
    } else if (uid_src === uid_dst) {
      return { message: '자기 자신과 친구 요청을 할 수 없습니다.' };
    }
    return this.friendsService.create(uid_src, uid_dst);
  }

  @Get()
  findAll() {
    return this.friendsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.friendsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateFriendDto: UpdateFriendDto) {
    return this.friendsService.update(+id, updateFriendDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.friendsService.remove(+id);
  }
}
