import { ApiProperty } from '@nestjs/swagger';

export class DeleteFriendDto {
  @ApiProperty({
    description: '친구 삭제 요청자의 uid',
  })
  uid_src: string;

  @ApiProperty({
    description: '친구 삭제 대상자의 uid',
  })
  uid_dst: string;
}
