import { Injectable } from '@nestjs/common';
import client from './connection';

@Injectable()
export class AppService {
  async search(
    top_right_lat,
    top_right_lon,
    bottom_left_lat,
    bottom_left_lon,
    category,
    text,
  ): Promise<unknown[]> {
    let temp = '';
    if (category.length == 1) {
      temp = category;
    } else {
      temp = category.join(' ');
    }
    const categories = temp;
    console.log(categories);
    const elastic = client;
    try {
      const response = await elastic.search({
        index: 'test',
        query: {
          bool: {
            must: [
              {
                match: {
                  theme: categories,
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

  async withrating(
    top_right_lat,
    top_right_lon,
    bottom_left_lat,
    bottom_left_lon,
    category,
    text,
  ): Promise<unknown[]> {
    const categories = category.join(' ');
    console.log(categories);
    const elastic = client;
    try {
      const response = await elastic.search({
        index: 'store_list',
        sort: [
          {'naver_star': 'desc'},
          '_score'
        ],
        query: {
          match_all: {},
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

  async withdistance(
    top_right_lat,
    top_right_lon,
    bottom_left_lat,
    bottom_left_lon,
    category,
    text,
  ): Promise<unknown[]> {
    const categories = category.join(' ');
    console.log(categories);
    const elastic = client;
    try {
      const response = await elastic.search({
        index: 'store_list',
        query: {
          bool: {
            must: [
              {
                match: {
                  category: categories,
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

  async testsearch(): Promise<unknown> {
    const elastic = client;
    try {
      const response = await elastic.search({
        index: 'store_list',
        query: {
          bool: {
            filter: {
              geo_bounding_box: {
                location: {
                  top_right: {
                    lat: 37.56221127978163,
                    lon: 126.93394472172852,
                  },
                  bottom_left: {
                    lat: 37.526517175496835,
                    lon: 126.84622575810548,
                  },
                },
              },
            },
          }
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
