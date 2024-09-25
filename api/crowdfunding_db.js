import { createConnection } from 'mysql2';
// mysql连接
const mysql = createConnection({
  host: 'localhost',       
  user: 'root',
  password: '123456',
  database: 'crowdfunding_db',
}).promise();
export default mysql
