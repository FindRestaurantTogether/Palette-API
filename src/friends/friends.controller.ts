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
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { UsersService } from '../users/users.service';

@ApiTags('Friends')
@Controller('api/friends')
export class FriendsController {
  constructor(
    private readonly usersService: UsersService,
    private readonly friendsService: FriendsService,
  ) {}

  @ApiOperation({
    summary: '친구 추가 요청',
    description: '친구 추가를 요청합니다.',
  })
  @Post('request')
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

  @ApiOperation({
    summary: '친구 목록',
    description: '친구 목록을 조회합니다.',
  })
  @Get('list/:uid')
  getList(@Param('uid') uid: string) {
    return this.friendsService.getList(uid);
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
