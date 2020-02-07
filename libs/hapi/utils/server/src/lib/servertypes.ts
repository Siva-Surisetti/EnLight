import { Lifecycle, Server, ServerOptions } from 'hapi';

export enum RequestExtensionPoint {
  onRequest = 'onRequest',
  onPreResponse = 'onPreResponse'
}
export interface HapiServerRequestExtension {
  type: RequestExtensionPoint;
  method: Lifecycle.Method;
}

export interface IPlugin {
  hapiPlugin: HapiServerPlugin;
  options?: any;
}
export interface EnlightHapiConfig {
  appName: string;
  appVersion: string;
  plugins: IPlugin[];
  extensions?: HapiServerRequestExtension[];
}

export interface HapiServerPlugin {
  name: string;
  version: string;
  once?: boolean;
  register(server: Server, options: any): Promise<void>;
}

export interface HapiServerOptions extends ServerOptions {
  port: number;
  host: string;
  address: string;
  tls?: {
    key: string;
    cert: string;
  };
  plugins?: any[];
  state?: {
    strictHeader: boolean;
  };
}
