import { Server } from 'hapi';

export class HapiUtilService {
  constructor() {}

  async init() {
    try {
      const server = new Server({
        port: 3333,
        host: 'localhost'
      });

      server.route({
        method: 'GET',
        path: '/',
        handler: (request, h) => {
          return {
            hello: 'world. Its working !!!!!'
          };
        }
      });

      await server.start();
      console.log('Server running on %s', server.info.uri);
    } catch (error) {
      process.exit(1);
    }
  }
}
