import { Server } from 'hapi';
import {
  SERVER_CONST,
  REQ_METHOD,
  ROUTE_CONST,
  MSG_CONST
} from '@workspace/constants';

export class HapiUtilService {
  constructor(public config: any) {}

  async init() {
    try {
      const server = new Server({
        port: SERVER_CONST.PORT,
        host: SERVER_CONST.HOST
      });

      await server.register({
        plugin: require('hapi-cors'),
        options: {
          origins: SERVER_CONST.ORIGINS
        }
      });

      server.route({
        method: REQ_METHOD.GET,
        path: ROUTE_CONST.TEST,
        handler: (request, h) => {
          return MSG_CONST.TEST_ROUTE;
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
    } catch (error) {
      process.exit(1);
    }
  }
}
