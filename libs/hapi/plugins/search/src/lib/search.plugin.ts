import { SearchApiPluginConfig } from '@workspace/models';
import {
  REQ_METHOD,
  ROUTE_CONST,
  SERVER_CONST,
  MSG_CONST
} from '@workspace/constants';

export class SearchApiPlugin {
  readonly name = 'SearchApiPlugin';
  readonly version = '1.0.0';

  constructor(private readonly config: SearchApiPluginConfig) {}

  readonly register = async (server, options) => {
    if (this.config.onRegister) {
      await this.config.onRegister();
    }

    server.route({
      path: ROUTE_CONST.SEARCH,
      method: REQ_METHOD.GET,
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
            SERVER_CONST.BASE_URL
          );
        } catch (error) {
          console.log(MSG_CONST.SEARCH_ERROR, Error);
        }
      }
    });
  };
}
