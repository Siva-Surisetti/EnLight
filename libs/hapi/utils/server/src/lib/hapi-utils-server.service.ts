import { Server } from 'hapi';

export class HapiUtilService {
  constructor(public config: any) {}

  async init() {
    try {
      const server = new Server({
        port: 3333,
        host: 'localhost',
        routes: {
          cors: {
            origin: ['*'],
            headers: ['Authorization'],
            exposedHeaders: ['Accept'],
            additionalExposedHeaders: ['Accept']
          }
        }
      });

      server.route({
        method: 'GET',
        path: '/hello',
        handler: (request, h) => {
          return {
            hello: 'world. Its working !!!!!'
          };
        }
      });

      const pluginPromises: Promise<void>[] = this.config.plugins.reduce(
        (res: Promise<void>[], plugin: any) => {
          const pluginOptions = { ...plugin.options };
          res.push(plugin.hapiPlugin.register(server, pluginOptions));
          return res;
        },
        []
      );

      await Promise.all([...pluginPromises, server.start()]);
      console.log('Server running on %s', server.info.uri);
    } catch (error) {
      process.exit(1);
    }
  }
}
