const Fastify = require('fastify');

const fastify = Fastify({
  logger: {
    transport: {
      targets: [
        {
          target: 'pino-pretty',
          options: {
            translateTime: 'dd-mm-yyyy HH:MM:ss Z',
            ignore: 'pid,hostname',
            singleLine: true,
          },
        },
      ],
    },
  }
});

fastify.get('/', async () => {
  return { hello: 'example-2' }
});

const start = async () => {
  try {
    await fastify.listen({ port: 3000 })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
};

start();