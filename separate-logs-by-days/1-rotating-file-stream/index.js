const Fastify = require('fastify')
const pino = require('pino');
const rfs = require('rotating-file-stream');

const LOGGING_DIR = `${__dirname}/logs`;

const getCurrentDate = () => {
  const date = new Date();

  const day = date.getDate();
  const month = date.getMonth() + 1;
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

const fileStream = rfs.createStream(() => `${LOGGING_DIR}/${getCurrentDate()}.log`, { interval: '1d' });
const logger = pino({}, pino.multistream([{ stream: process.stdout }, { stream: fileStream }]));

const fastify = Fastify({
  logger
});

fastify.get('/', async () => {
  return { hello: 'world' }
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start();