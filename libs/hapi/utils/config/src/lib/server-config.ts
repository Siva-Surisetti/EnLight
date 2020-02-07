import { ServerConfig } from '@workspace/shared/config';
import { loadServerConfig } from './load-config';

let config: ServerConfig;
config = loadServerConfig();

export { config };
