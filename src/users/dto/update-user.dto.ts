import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({
    description: '변경할 사용자 uid',
    example: 'sample_uid',
  })
  uid: string;

  @ApiProperty({
    description: '변경할 사용자 닉네임',
    example: 'sameple_nickname',
  })
  name: string;
}
