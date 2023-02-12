import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';

@ApiTags('Elasticsearch')
@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: '검색',
    description: '검색',
  })
  @Get('search')
  search(@Query('top_right_lat') top_right_lat:number, @Query('top_right_lon') top_right_lon:number, @Query('bottom_left_lat') bottom_left_lat:number, @Query('bottom_left_lon') bottom_left_lon:number, @Query('category') category:string[], @Query('text') text:string) {
    return this.appService.search(top_right_lat, top_right_lon, bottom_left_lat, bottom_left_lon, category, text);
  }

  @ApiOperation({
    summary: '모두 가져오기',
    description: '모두 가져오기',
  })
  @Get('findAll')
  findOneById() {
    return this.appService.findAll();
  }

  @ApiOperation({
    summary: '테스트',
    description: '테스트',
  })
  @Get('test')
  test() {
    return this.appService.test();
  }
}