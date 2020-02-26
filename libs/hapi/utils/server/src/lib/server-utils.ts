import * as log4js from 'log4js';
import * as CircularJSON from 'circular-json';
import { config } from '@workspace/hapi/utils/config';
import { ServerUtilsService } from './server-utils.service';
import { HapiServerOptions, EnlightHapiConfig } from './servertypes';

log4js.addLayout('json', cfg => logEvent =>
  CircularJSON.stringify(logEvent) + cfg.separator
);

log4js.configure({
  appenders: {
    out: {
      type: config.logging.level,
      filename: `/var/logs/apps/${process.env.APP_NAME}_${process.env.K8S_ENV}.log`,
      layout: {
        type: 'pattern',
        pattern:
          '%d{yyyy-MM-dd hh:mm:ss.SSS} | logType=%p | logCategory=%c | USN=%X{sessionId} | %m'
      }
    }
  },
  categories: { default: { appenders: ['out'], level: config.logging.level } }
});

const logger = log4js.getLogger('server-utils');
const environment = 'dev';
export const defaultServerOptions: HapiServerOptions = {
  port: 3000,
  address: '0.0.0.0',
  host: 'localhost',
  plugins: ['serveStatic'],
  state: {
    strictHeader: false
  }
};

export async function startServer(hapiConfig: EnlightHapiConfig) {
  console.log('@@@@@@@@@@@ IN Start server @@@@@@@@@@@@@');
  return new ServerUtilsService(config, logger, {
    defaultServerOptions: defaultServerOptions,
    swaggerOptions: {},
    environment: environment
  }).start(hapiConfig);
}
