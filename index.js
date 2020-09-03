process.env.NODE_TLS_REJECT_UNAUTHORIZED = '0';

const server = require('./server.js');

server.listen(4000, () => {
  console.log('\n* Server Running on http://localhost:4000 *\n');
});