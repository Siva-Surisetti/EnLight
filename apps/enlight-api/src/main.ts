import { startServer } from '@workspace/hapi/utils/server';
import {
  HapiServerPlugin,
  searchPluginFactory
} from '@workspace/hapi/plugins/search';

export interface IPlugin {
  hapiPlugin: HapiServerPlugin;
  options?: any;
}
export interface EnlightHapiConfig {
  appName: string;
  appVersion: string;
  plugins: IPlugin[];
}

const config: EnlightHapiConfig = {
  appName: 'flex',
  appVersion: '0.0.1',
  plugins: [{ hapiPlugin: searchPluginFactory() }]
};

startServer(config);
