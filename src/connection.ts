import { Client } from '@elastic/elasticsearch';

const client = new Client({
  node: 'localhost:9200',
  auth: {
    username: '05550d359db3',
    password: '',
  },
  requestTimeout: 60000,
  maxRetries: 3,
  sniffOnStart: true,
});

export default client;
