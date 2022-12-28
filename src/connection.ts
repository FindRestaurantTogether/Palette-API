import { Client } from '@elastic/elasticsearch';

const client = new Client({
  node: 'http://localhost:9200',
  auth: {
    username: 'ubuntu',
    password: '0aTqiPtStlvpQgfRMvl6',
  },
  requestTimeout: 60000,
  maxRetries: 3,
  sniffOnStart: true,
});

export default client;
