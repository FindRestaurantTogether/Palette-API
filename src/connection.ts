import { Client } from '@elastic/elasticsearch';

const client = new Client({
  node: 'http://localhost:9200',
  auth: {
    username: 'elastic',
    password: 'dfattack',
  },
  requestTimeout: 60000,
  maxRetries: 3,
  sniffOnStart: true,
});

export default client;

// async function save() {
//   const file = fs.readFileSync('src/.csv', 'utf8');
//   const data = file.split('\r\n');
//
//   for (let i = 0; i < data.length; i++) {
//     const row = data[i].split(',');
//     const body = {
//       lot_address: row[0],
//       road_address: row[1],
//       name: row[2],
//       category: row[3],
//       feature: row[4],
//       phone_number: row[5],
//       work_hour: row[6],
//       menu: row[7],
//       blog: row[8],
//       review: row[9],
//       menu_image: row[10],
//       color: row[11],
//       new_category: row[12],
//       service: row[13],
//       atmosphere: row[14],
//     };
//     const res = await client.index({
//       index: 'restaurants_gangnam',
//       body,
//     });
//     console.log(res);
//   }
// }

//save();
