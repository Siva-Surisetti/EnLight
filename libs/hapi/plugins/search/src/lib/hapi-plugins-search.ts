import { HapiHttpClient } from '@workspace/hapi/utils/server';
import { Server } from 'hapi';

export interface HapiServerPlugin {
  name: string;
  version: string;
  register(server: Server, options: any): Promise<void>;
}

export const searchPluginFactory: () => HapiServerPlugin = () =>
  new SearchApiPlugin({
    getSearchResults: async ({ request }, baseURL) => {
      const url = `?q=${Object.keys(request.query)}`;
      const resp: any = await HapiHttpClient.invokeApi({
        method: 'GET',
        baseURL: baseURL,
        url,
        headers: {
          'Content-Type': 'application/json'
        }
      });
      return resp;
    }
  });

export interface SearchApiPluginConfig {
  onRegister?: Function;
  getSearchResults: (
    config: {
      server: any;
      options: any;
      request: {
        params: {};
        query: any;
        // query: {
        //   searchQuery?: string;
        // };
      };
      headers: any;
    },
    baseURL: string
  ) => Promise<any>;
}

export class SearchApiPlugin {
  readonly name = 'SearchApiPlugin';
  readonly version = '1.0.0';

  constructor(private readonly config: SearchApiPluginConfig) {}

  readonly register = async (server, options) => {
    if (this.config.onRegister) {
      await this.config.onRegister();
    }

    server.route({
      path: '/api/search',
      method: 'GET',
      handler: async (request, h) => {
        try {
          return await this.config.getSearchResults(
            {
              server,
              options,
              request: {
                params: request.params,
                query: request.query
              },
              headers: request.headers
            },
            'https://www.googleapis.com/books/v1/volumes'
          );
        } catch (error) {
          // return serverUnavailable(error);
        }
      }
    });
  };
}
