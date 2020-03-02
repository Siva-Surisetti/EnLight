import { Server } from 'hapi';

export interface HapiServerPlugin {
  name: string;
  version: string;
  register(server: Server, options: any): Promise<void>;
}

export interface IPlugin {
  hapiPlugin: HapiServerPlugin;
  options?: any;
}

export interface EnlightHapiConfig {
  appName: string;
  appVersion: string;
  plugins: IPlugin[];
}
