const http = require('node:http');
const metalog = require('metalog');

const PORT = 8000;
const PATH_TO_LOGS = './logs';

(async () => {
  const logger = await metalog.openLog({
    path: PATH_TO_LOGS,
    home: __dirname,
    writeInterval: 3000,
    writeBuffer: 64 * 1024,
    keepDays: 5,
    json: false,
  });

  http.createServer((req, res) => {
    if (req.url === '/' && req.method === 'GET') {
      logger.console.log('Received GET /');

      res.end('Finished');
    }
  }).listen(PORT, () => logger.console.log(`Server started at port: ${PORT}`));
})();