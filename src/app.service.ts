import { Injectable } from '@nestjs/common';
import client from './connection';

@Injectable()
export class AppService {
  async search(keyword): Promise<unknown[]> {
    const elastic = client;
    try {
      const response = await elastic.search({
        index: 'store_list',
        query: {
          match: {
            keyword,
          },
        },
      });
      return response.hits.hits.map((hit) => hit._source);
    } catch (error) {
      console.log(error);
    }
  }

  async findOne(id): Promise<unknown> {
    const elastic = client;
    try {
      const response = await elastic.search({
        index: 'store_list',
        body: {
          query: {
            match: {
              id: id,
            },
          },
        },
      });
      return response.hits.hits[0]._source;
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
