import { SearchApiPluginConfig } from '@workspace/models';

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
