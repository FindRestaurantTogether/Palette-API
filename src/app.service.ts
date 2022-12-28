import { Injectable } from '@nestjs/common';
import client from './connection';

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
            fields: ['name', 'menu.name'],
            operator: 'or',
          },
        },
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
