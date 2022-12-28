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
  @ApiImplicitQuery({
    name: 'query',
    required: true,
    description: '검색어',
  })
  @Get('search')
  search(@Query('query') query) {
    return this.appService.search(query);
  }

  @ApiOperation({
    summary: '1번',
    description: '1번',
  })
  @Get('findOne')
  findOne() {
    return this.appService.findOne();
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
