import { ServerConfig } from '@workspace/shared/config';
import * as h2o2 from 'h2o2';
import * as Hapi from 'hapi';
import * as HapiSwagger from 'hapi-swagger';
import * as log4js from 'log4js';
import { HapiServerOptions, IPlugin, EnlightHapiConfig } from './servertypes';

export class ServerUtilsService {
  server: Hapi.Server;

  constructor(
    public serverConfig: ServerConfig,
    public logger: log4js.Logger,
    public options: {
      defaultServerOptions: HapiServerOptions;
      swaggerOptions: any;
      environment: string;
    }
  ) {}

  createServerInstance(serverConfigOptions: HapiServerOptions) {
    this.server = new Hapi.Server(serverConfigOptions);
  }

  startServerInstance() {
    return this.server.start();
  }

  async start(hapiConfig: EnlightHapiConfig) {
    console.log('@@@@@@@@@@@ IN Start Method @@@@@@@@@@@@@');
    try {
      const environment = this.options.environment || 'local';
      const { address, host, state } = this.options.defaultServerOptions;
      const serverConfigOptions: HapiServerOptions = {
        port: this.serverConfig.server.port,
        address,
        host,
        state
      };

      if (this.serverConfig.server.cors) {
        serverConfigOptions.routes = {
          ...serverConfigOptions.routes,
          cors: this.serverConfig.server.cors
        };
      }
      this.createServerInstance(serverConfigOptions);

      await this.server.register([
        h2o2,
        {
          plugin: HapiSwagger,
          options: this.options.swaggerOptions
        }
      ]);

      const appName: string = hapiConfig.appName;
      const appVersion: string = hapiConfig.appVersion;
      const defaultOptions = {
        environment,
        appName,
        appVersion
      };

      console.log('@@@@@@@@@@@ Register Method @@@@@@@@@@@@@');
      const pluginPromises: Promise<void>[] = hapiConfig.plugins.reduce(
        (res: Promise<void>[], plugin: IPlugin) => {
          this.logger.info('Registering plugin - ' + plugin.hapiPlugin.name);
          const pluginOptions = { ...defaultOptions, ...plugin.options };
          res.push(plugin.hapiPlugin.register(this.server, pluginOptions));
          return res;
        },
        []
      );

      await Promise.all([...pluginPromises, this.startServerInstance()]);
      this.logger.info('Server running at:', this.server.info.uri);
      console.log(
        '@@@@@@@@@@@ Server running at:',
        this.server.info.uri,
        ' @@@@@@@@@@@@@'
      );
      return true;
    } catch (error) {
      this.logger.error(error);
      this.logger.error(
        'exiting hapi-main.ts due to one or more failures during server startup'
      );
      process.exit(-1);
    }
  }
}
