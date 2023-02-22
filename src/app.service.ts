import { Injectable } from '@nestjs/common';
import client from './connection';

@Injectable()
export class AppService {
  async search(
    top_right_lat,
    top_right_lon,
    bottom_left_lat,
    bottom_left_lon,
    category = 'None',
    service = 'None',
    theme = 'None',
    text = 'None',
  ): Promise<unknown[]> {
    const elastic = client;
    try {
      const response = await elastic.search({
        index: 'store_list',
        query: {
          bool: {
            must: [
              {
                match: {
                  category: category,
                },
              },
              {
                match: {
                  service: {
                    query: service,
                    operator: 'and',
                  },
                },
              },
              {
                match: {
                  theme: {
                    query: theme,
                    operator: 'and',
                  },
                },
              },
            ],
            should: [
              {
                match: {
                  name: text,
                },
              },
            ],
            filter: {
              geo_bounding_box: {
                location: {
                  top_right: {
                    lat: top_right_lat,
                    lon: top_right_lon,
                  },
                  bottom_left: {
                    lat: bottom_left_lat,
                    lon: bottom_left_lon,
                  },
                },
              },
            },
          },
        },
      });
      return response.hits.hits.map((row) => {
        return {
          id: row._id,
          source: row._source,
        };
      });
    } catch (error) {
      console.log(error);
    }
  }
  async testsearch(
    top_right_lat,
    top_right_lon,
    bottom_left_lat,
    bottom_left_lon,
  ): Promise<unknown> {
    const elastic = client;
    try {
      const response = await elastic.search({
        index: 'store_list',
        size: 30,
        sort: [{ naver_cnt: 'desc' }, '_score'],
        query: {
          bool: {
            filter: {
              geo_bounding_box: {
                location: {
                  top_right: {
                    lat: top_right_lat,
                    lon: top_right_lon,
                  },
                  bottom_left: {
                    lat: bottom_left_lat,
                    lon: bottom_left_lon,
                  },
                },
              },
            },
          },
        },
      });
      return response.hits.hits.map((hit) => {
        return {
          id: hit._id,
          source: hit._source,
          score: hit._score,
        };
      });
    } catch (error) {
      console.log(error);
    }
  }
  async idsearch(store_id): Promise<unknown> {
    const elastic = client;
    try {
      const response = await elastic.get({
        index: 'store_list',
        id: store_id,
      });
      return { id: response._id, source: response._source };
    } catch (error) {
      console.log(error);
    }
  }
  async isopening(store_id): Promise<unknown> {
    return 'open';
  }
  async findAll(): Promise<unknown> {
    const elastic = client;
    try {
      const response = await elastic.search({
        size: 100,
        index: 'store_list',
        query: {
          match_all: {},
        },
      });
      return response.hits.hits.map((hit) => {
        return {
          id: hit._id,
          source: hit._source,
        };
      });
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