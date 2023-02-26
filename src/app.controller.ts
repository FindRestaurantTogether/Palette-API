import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';

@ApiTags('Elasticsearch')
@Controller('api')
export class AppController {
  constructor(private readonly appService: AppService) {}

  @ApiOperation({
    summary: 'search',
    description: 'search with many filters',
  })
  @ApiImplicitQuery({
    name: 'category',
    required: false,
  })
  @ApiImplicitQuery({
    name: 'service',
    required: false,
  })
  @ApiImplicitQuery({
    name: 'theme',
    required: false,
  })
  @ApiImplicitQuery({
    name: 'text',
    required: false,
  })
  @Get('search')
  search(
    @Query('top_right_lat') top_right_lat: number,
    @Query('top_right_lon') top_right_lon: number,
    @Query('bottom_left_lat') bottom_left_lat: number,
    @Query('bottom_left_lon') bottom_left_lon: number,
    @Query('category') category: string,
    @Query('service') service: string,
    @Query('theme') theme: string,
    @Query('text') text: string,
  ) {
    return this.appService.search(
      top_right_lat,
      top_right_lon,
      bottom_left_lat,
      bottom_left_lon,
      category,
      service,
      theme,
      text,
    );
  }
  @ApiOperation({
    summary: 'info from ID',
    description: 'get store information by using ID',
  })
  @Get('info-from-id')
  infoFromId(@Query('store_id') store_id: string) {
    return this.appService.infoFromId(store_id);
  }
  @ApiOperation({
    summary: 'is opening',
    description: 'get store is opening or not',
  })
  @Get('is-opening')
  isOpening(@Query('store_id') store_id: string) {
    return this.appService.isOpening(store_id);
  }
  @ApiOperation({
    summary: 'check connection',
    description: 'check ElasticSearch Connection',
  })
  @Get('connection')
  elasticConnection() {
    return this.appService.elasticConnection();
  }
  @ApiOperation({
    summary: 'find all',
    description: 'test all data is good',
  })
  @Get('find-all')
  findOneById() {
    return this.appService.findAll();
  }
  @ApiOperation({
    summary: 'test search',
    description: 'search for test',
  })
  @Get('testsearch')
  testSearch(
    @Query('top_right_lat') top_right_lat: number,
    @Query('top_right_lon') top_right_lon: number,
    @Query('bottom_left_lat') bottom_left_lat: number,
    @Query('bottom_left_lon') bottom_left_lon: number,
  ) {
    return this.appService.testSearch(
      top_right_lat,
      top_right_lon,
      bottom_left_lat,
      bottom_left_lon,
    );
  }
}
