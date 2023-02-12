import { Injectable } from '@nestjs/common';
import client from './connection';

@Injectable()
export class AppService {
  async search(top_right_lat, top_right_lon, bottom_left_lat, bottom_left_lon, category, text): Promise<unknown[]> {
    const categories = category;

    const elastic = client;
    try {
      const response = await elastic.search({
        index: 'store_list',
        query: {
          "bool": {
            "must": [
              {
                "match": {
                  "category": categories[0]
                }
              }
            ],
            "should": [
              {
                "match": {
                  "name": text
                }
              }
            ],
            "filter": {
              "geo_bounding_box": {
                "location": {
                  "top_right": {
                    "lat": top_right_lat,
                    "lon": top_right_lon
                  },
                  "bottom_left": {
                    "lat": bottom_left_lat,
                    "lon": bottom_left_lon
                  }
                }
              }
            }
          }
        }
      });
      return response.hits.hits.map((hit) => hit._source);
    } catch (error) {
      console.log(error);
    }
  }

  async findAll(): Promise<unknown> {
    const elastic = client;
    try {
      const response = await elastic.search({
        index: 'store_list',
        query: {
          match_all: {},
        },
      });
      return response.hits.hits.map((hit) => hit._source);
    } catch (error) {
      console.log(error);
    }
  }

  async test() {
    try {
      return await client.cluster.health({});
    } catch (error) {
      return error;
    }
  }
}
