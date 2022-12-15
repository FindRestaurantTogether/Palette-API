import { Entity } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class CreateFriendDto {
  @ApiProperty({
    description: '친구 요청을 보낸 사용자 UID',
    example: 'uidfrom1Q2W3E4R5T6Y7',
  })
  uid_src: string;

  @ApiProperty({
    description: '친구 요청을 받은 사용자 email',
    example: 'palette@palette.com',
  })
  email_dst: string;
}
