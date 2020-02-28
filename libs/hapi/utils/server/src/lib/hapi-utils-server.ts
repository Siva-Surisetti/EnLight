import { HapiUtilService } from './hapi-utils-server.service';

export async function startServer(config: any) {
  new HapiUtilService(config).init();
}
