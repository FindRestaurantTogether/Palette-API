import { Injectable } from '@nestjs/common';
import client from './connection';
import { RestaurantDto } from './restaurant.dto';

@Injectable()
export class AppService {
  async search(keyword): Promise<unknown[]> {
    const query = keyword;
    const elastic = client;
    try {
      const response = await elastic.search({
        index: 'store_list',
        query: {
          multi_match: {
            query,
          },
        },
      });
      return response.hits.hits.map((hit) => hit._source);
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
