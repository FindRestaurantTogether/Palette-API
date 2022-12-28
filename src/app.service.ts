import { Injectable } from '@nestjs/common';
import client from './connection';
import { GetGetResult } from '@elastic/elasticsearch/lib/api/types';

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

  async findOne(): Promise<GetGetResult> {
    const elastic = client;
    try {
      const response = await elastic.get({
        index: 'store_list',
        id: '1',
      });
      return response;
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
