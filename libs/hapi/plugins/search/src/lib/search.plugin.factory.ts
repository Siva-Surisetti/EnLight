import { HapiHttpClient } from '@workspace/hapi/utils/server';
import { HapiServerPlugin } from '@workspace/models';
import { SearchApiPlugin } from '@workspace/hapi/plugins/search';

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
