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
    service,
    theme,
    text,
  ): Promise<unknown[]> {
    const elastic = client;
    if (category && service && theme && text) {
      try {
        const response = await elastic.search({
          index: 'store_list',
          size: 30,
          _source: ['location', 'main_category', 'naver_star'],
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
                {
                  match: {
                    road_address: text,
                  },
                },
                {
                  match: {
                    jibun_address: text,
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
    } else if (!category && service && theme && text) {
      try {
        const response = await elastic.search({
          index: 'store_list',
          size: 30,
          _source: ['location', 'main_category', 'naver_star'],
          query: {
            bool: {
              must: [
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
                {
                  match: {
                    road_address: text,
                  },
                },
                {
                  match: {
                    jibun_address: text,
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
    } else if (category && !service && theme && text) {
      try {
        const response = await elastic.search({
          index: 'store_list',
          size: 30,
          _source: ['location', 'main_category', 'naver_star'],
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
                {
                  match: {
                    road_address: text,
                  },
                },
                {
                  match: {
                    jibun_address: text,
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
    } else if (category && service && !theme && text) {
      try {
        const response = await elastic.search({
          index: 'store_list',
          size: 30,
          _source: ['location', 'main_category', 'naver_star'],
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
              ],
              should: [
                {
                  match: {
                    name: text,
                  },
                },
                {
                  match: {
                    road_address: text,
                  },
                },
                {
                  match: {
                    jibun_address: text,
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
    } else if (category && service && theme && !text) {
      try {
        const response = await elastic.search({
          index: 'store_list',
          size: 30,
          _source: ['location', 'main_category', 'naver_star'],
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
    } else if (!category && !service && theme && text) {
      try {
        const response = await elastic.search({
          index: 'store_list',
          size: 30,
          _source: ['location', 'main_category', 'naver_star'],
          query: {
            bool: {
              must: [
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
                {
                  match: {
                    road_address: text,
                  },
                },
                {
                  match: {
                    jibun_address: text,
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
    } else if (category && !service && !theme && text) {
      try {
        const response = await elastic.search({
          index: 'store_list',
          size: 30,
          _source: ['location', 'main_category', 'naver_star'],
          query: {
            bool: {
              must: [
                {
                  match: {
                    category: category,
                  },
                },
              ],
              should: [
                {
                  match: {
                    name: text,
                  },
                },
                {
                  match: {
                    road_address: text,
                  },
                },
                {
                  match: {
                    jibun_address: text,
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
    } else if (category && service && !theme && !text) {
      try {
        const response = await elastic.search({
          index: 'store_list',
          size: 30,
          _source: ['location', 'main_category', 'naver_star'],
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
    } else if (!category && service && !theme && text) {
      try {
        const response = await elastic.search({
          index: 'store_list',
          size: 30,
          _source: ['location', 'main_category', 'naver_star'],
          query: {
            bool: {
              must: [
                {
                  match: {
                    service: {
                      query: service,
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
                {
                  match: {
                    road_address: text,
                  },
                },
                {
                  match: {
                    jibun_address: text,
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
    } else if (category && !service && theme && !text) {
      try {
        const response = await elastic.search({
          index: 'store_list',
          size: 30,
          _source: ['location', 'main_category', 'naver_star'],
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
                    theme: {
                      query: theme,
                      operator: 'and',
                    },
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
    } else if (!category && service && theme && !text) {
      try {
        const response = await elastic.search({
          index: 'store_list',
          size: 30,
          _source: ['location', 'main_category', 'naver_star'],
          query: {
            bool: {
              must: [
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
    } else if (!category && !service && !theme && text) {
      try {
        const response = await elastic.search({
          index: 'store_list',
          size: 30,
          _source: ['location', 'main_category', 'naver_star'],
          query: {
            bool: {
              should: [
                {
                  match: {
                    name: text,
                  },
                },
                {
                  match: {
                    road_address: text,
                  },
                },
                {
                  match: {
                    jibun_address: text,
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
    } else if (category && !service && !theme && !text) {
      try {
        const response = await elastic.search({
          index: 'store_list',
          size: 30,
          _source: ['location', 'main_category', 'naver_star'],
          query: {
            bool: {
              must: [
                {
                  match: {
                    category: category,
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
    } else if (!category && service && !theme && !text) {
      try {
        const response = await elastic.search({
          index: 'store_list',
          size: 30,
          _source: ['location', 'main_category', 'naver_star'],
          query: {
            bool: {
              must: [
                {
                  match: {
                    service: {
                      query: service,
                      operator: 'and',
                    },
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
    } else if (!category && !service && theme && !text) {
      try {
        const response = await elastic.search({
          index: 'store_list',
          size: 30,
          _source: ['location', 'main_category', 'naver_star'],
          query: {
            bool: {
              must: [
                {
                  match: {
                    theme: {
                      query: theme,
                      operator: 'and',
                    },
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
    } else if (!category && !service && !theme && !text) {
      try {
        const response = await elastic.search({
          index: 'store_list',
          size: 30,
          _source: ['location', 'main_category', 'naver_star'],
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
  }

  async infoFromId(store_id): Promise<unknown> {
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
  async isOpening(store_id): Promise<unknown> {
    const weekday = new Array(7);
    weekday[0] = '월';
    weekday[1] = '화';
    weekday[2] = '수';
    weekday[3] = '목';
    weekday[4] = '금';
    weekday[5] = '토';
    weekday[6] = '일';
    const d = new Date();
    let index = d.getDay() - 1;
    if (index < 0) {
      index = 6;
    }
    const nowMinutes = d.getHours() * 60 + d.getMinutes();

    const elastic = client;
    try {
      const response = await elastic.get({
        index: 'store_list',
        id: store_id,
        _source: ['opening_hour', 'opening_breaktime'],
      });
      const today_opening_breaktime =
        response._source['opening_breaktime'][index][weekday[index]];
      const today_opening_hour =
        response._source['opening_hour'][index][weekday[index]];
      if (today_opening_breaktime != 'None') {
        const timeline = today_opening_breaktime.split('-');
        const start = timeline[0].split(':');
        const startMinutes = Number(start[0]) * 60 + Number(start[1]);
        const end = timeline[1].split(':');
        const endMinutes = Number(end[0]) * 60 + Number(end[1]);
        if (nowMinutes >= startMinutes && nowMinutes <= endMinutes) {
          return 'breaktime';
        }
      }
      if (today_opening_hour == '휴무') {
        return 'closed';
      } else if (today_opening_hour != 'None') {
        const timeline = today_opening_hour.split('-');
        const start = timeline[0].split(':');
        const startMinutes = Number(start[0]) * 60 + Number(start[1]);
        const end = timeline[1].split(':');
        let endMinutes = Number(end[0]) * 60 + Number(end[1]);
        if (endMinutes < startMinutes) {
          endMinutes += 24 * 60;
        }
        if (nowMinutes >= startMinutes && nowMinutes <= endMinutes) {
          return 'open';
        } else {
          return 'closed';
        }
      }
      return 'None';
    } catch (error) {
      console.log(error);
    }
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
  async elasticConnection() {
    try {
      return await client.cluster.health({});
    } catch (error) {
      return error;
    }
  }
  async testSearch(
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
}
