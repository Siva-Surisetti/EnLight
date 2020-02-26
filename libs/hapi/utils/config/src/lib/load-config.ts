import { ServerConfig } from '@workspace/shared/config';

export const DEFAULT_SERVER_CONFIG: ServerConfig = {
  server: {
    auth: false,
    port: 3000,
    ssl: {
      enabled: false,
      cert: '',
      key: '',
      ca: ''
    },
    connectionTimeout: 5000
  },
  redis: {
    host: 'localhost',
    port: 7000,
    cluster: false,
    defaultExpiration: 1000
  },
  logging: {
    level: 'info',
    pattern: '%d %p %c %X{sessionId} %m'
  }
};

export function loadServerConfig(): ServerConfig {
  return DEFAULT_SERVER_CONFIG;
}
