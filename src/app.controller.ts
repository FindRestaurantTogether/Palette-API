import { Body, Controller, Get, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ApiImplicitQuery } from '@nestjs/swagger/dist/decorators/api-implicit-query.decorator';
import { RestaurantDto } from './restaurant.dto';

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
    summary: '검색',
    description: '검색',
  })
  @Get('post')
  async searchPost(@Body('restaurant') restaurant: RestaurantDto, @Res() res) {
    return res.end(await this.appService.test(restaurant));
  }
}