import { EnlightHapiConfig } from '@workspace/models';
import { startServer } from '@workspace/hapi/utils/server';
import { searchPluginFactory } from '@workspace/hapi/plugins/search';

const config: EnlightHapiConfig = {
  appName: 'Enlight',
  appVersion: '1.0.0',
  plugins: [{ hapiPlugin: searchPluginFactory() }]
};

startServer(config);
