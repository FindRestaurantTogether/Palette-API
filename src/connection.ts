import { Client } from '@elastic/elasticsearch';

const client = new Client({
  node: 'http://localhost:9200',
  auth: {
    username: 'elastic',
    password: '',
  },
  requestTimeout: 60000,
  maxRetries: 3,
  sniffOnStart: true,
});

export default client;
