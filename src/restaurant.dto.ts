import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsString } from 'class-validator';
import { Entity } from 'typeorm';

@Entity('Restaurant')
export class RestaurantDto {
  @ApiProperty({
    example: '막이오름',
    description: '식당 이름',
  })
  @IsString()
  name: string;

  @ApiProperty({
    example: '강남구 가로수길 10',
    description: '도로명 주소',
  })
  @IsString()
  road_address: string;

  @ApiProperty({
    example: '강남구 신사동 541-17',
    description: '지번 주소',
  })
  @IsString()
  jibun_address: string;

  @ApiProperty({
    example: '02-123-4567',
    description: '식당 전화번호',
  })
  @IsString()
  call: string;

  @ApiProperty({
    example: '고기(구이)',
    description: '식당 카테고리',
  })
  @IsString()
  category: string;

  @ApiProperty({
    example: [
      { 월: '오후 5시 30분-오전 1시' },
      { 목: '오후 5시 30분-오전 1시' },
      { 금: '오후 5시 30분-오전 2시' },
      { 토: '오후 5시 30분-오전 2시' },
      { 일: '오후 5시 30분-오전 1시' },
    ],
    description: '식당 영업시간',
  })
  @IsArray()
  opening_hour: object[];

  @ApiProperty({
    example: ['가로수길술집', '신사동포차', '발렛파킹'],
    description: '식당 테마',
  })
  @IsArray()
  theme: string[];

  @ApiProperty({
    example: ['주차', '포장', '배달', '와이파이', '예약'],
    description: '서비스',
  })
  @IsArray()
  service: string[];

  @ApiProperty({
    example: {
      우삼겹야채찜: 14000,
      마라어묵탕: 15000,
      베이컨감자전: 5900,
    },
    description: '식당 메뉴',
  })
  @IsArray()
  menu: object[];

  @ApiProperty({
    example: [],
    description: '내부 사진',
  })
  @IsArray()
  inner_image: string[];

  @ApiProperty({
    example: [],
    description: '외부 사진',
  })
  @IsArray()
  outer_image: string[];

  @ApiProperty({
    example: [
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=https%3A%2F%2Fldb-phinf.pstatic.net%2F20200212_99%2F1581487436646NNE6n_JPEG%2Fv4C1dy_w0U1Khddou7_FYhwi.jpg',
      'https://search.pstatic.net/common/?autoRotate=true&quality=95&type=f320_320&src=http%3A%2F%2Fblogfiles.naver.net%2FMjAyMDEwMDZfMjAz%2FMDAxNjAxOTkyNDk1NTc3.2AxO0lVyKMbLS9AbKHVCTM9vaPz6N7o7iA19SmKlmp8g.vi15YODXebjEH_7i55u0IHbju93FZL57397OZKdebpwg.JPEG.dawoon1018%2FIMG_0500.jpg',
    ],
    description: '메뉴 사진',
  })
  @IsArray()
  menu_image: string[];
}
