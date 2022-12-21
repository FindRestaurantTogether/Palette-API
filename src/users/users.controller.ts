import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Put,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@Controller('api/users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @ApiOperation({
    summary: '사용자 추가',
    description: '사용자를 추가합니다.',
  })
  @Put('create')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @ApiOperation({
    summary: '사용자 조회',
    description: '모든 사용자를 조회합니다.',
  })
  @Get('find-all')
  findAll() {
    return this.usersService.findAll();
  }

  @ApiOperation({
    summary: 'uid 조회',
    description: 'uid를 조회합니다.',
  })
  @Get('find-uid/:uid')
  findUid(@Param('uid') uid: string) {
    return this.usersService.findUid(uid);
  }

  @ApiOperation({
    summary: 'email로 uid 조회',
    description: 'email로 uid를 조회합니다.',
  })
  @Get('find-email/:email')
  findUidByEmail(@Param('email') email: string) {
    return this.usersService.findUidByEmail(email);
  }

  @Patch('update/:id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(+id, updateUserDto);
  }

  @ApiOperation({
    summary: '회원 탈퇴',
    description: '해당 uid 사용자의 정보를 제거합니다.',
  })
  @Delete('delete/:uid')
  remove(@Param('uid') uid: string) {
    return this.usersService.remove(uid);
  }
}
