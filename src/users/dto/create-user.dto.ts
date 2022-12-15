import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    description: '사용자 UID',
    example: 'g0jG8Srmv59WVeJV9LKx',
  })
  uid: string;

  @ApiProperty({
    description: '사용자 이름',
    example: 'Palette',
  })
  name: string;

  @ApiProperty({
    description: '사용자 이메일',
    example: 'palette@palette.com',
  })
  email: string;
}
