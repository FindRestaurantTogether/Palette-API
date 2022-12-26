import { Injectable } from '@nestjs/common';
import client from './connection';
import { RestaurantDto } from './restaurant.dto';

@Injectable()
export class AppService {
  async search(keyword): Promise<RestaurantDto[]> {
    const query = keyword;
    const elastic = client;
    try {
      const response = await elastic.search({
        index: 'store_list',
        body: {
          query: {
            multi_match: {
              query,
            },
          },
        },
      });
      return response.body.hits.hits.map((hit) => hit._source);
    } catch (error) {
      console.log(error);
    }
  }

  async test(restaurant: RestaurantDto) {
    return {
      index: 'store_list',
      body: restaurant,
    };
  }
}
