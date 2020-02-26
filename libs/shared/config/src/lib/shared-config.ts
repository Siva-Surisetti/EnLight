export interface ServerConfig {
  server: Server;
  redis: RedisConfiguration;
  logging: Logging;
}

export interface Server {
  auth: boolean;
  port: number;
  ssl: Ssl;
  cors?: boolean;
  connectionTimeout: number;
}

export interface Ssl {
  enabled: boolean;
  cert: string;
  key: string;
  ca: string;
}

export interface RedisConfiguration {
  host: string;
  port: number;
  defaultExpiration: number;
  cluster: boolean;
}

export interface Logging {
  type?: string;
  level: string;
  pattern: string;
}
