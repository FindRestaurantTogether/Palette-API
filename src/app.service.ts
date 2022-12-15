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
        index: 'restaurants_gangnam',
        body: {
          query: {
            multi_match: {
              query,
            },
          },
        },
      });
      return response.hits.hits.map((row) => {
        return {
          lot_address: row._source['lot_address'],
          road_address: row._source['road_address'],
          name: row._source['name'],
          category: row._source['category'],
          feature: row._source['feature'],
          phone_number: row._source['phone_number'],
          work_hour: row._source['work_hour'],
          menu: row._source['menu'],
          sns: row._source['blog'],
          review: row._source['review'],
          menu_image: row._source['menu_image'],
          color: row._source['color'],
          new_category: row._source['new_category'],
          service: row._source['service'],
          atmosphere: row._source['atmosphere'],
        };
      });
    } catch (error) {
      console.log(error);
    }
  }

  async test(restaurant: RestaurantDto) {
    return {
      index: 'restaurants_gangnam',
      body: restaurant,
    };
  }
}
