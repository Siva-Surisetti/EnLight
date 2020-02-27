import { HapiUtilService } from './hapi-utils-server.service';

export async function startServer() {
  new HapiUtilService().init();
}
