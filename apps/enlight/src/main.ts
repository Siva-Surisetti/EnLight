import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

import { startServer, EnlightHapiConfig } from '@workspace/hapi/utils/server';

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .catch(err => console.error(err));

const hapiConfig: EnlightHapiConfig = {
  appName: 'ENLIGHT',
  appVersion: '1.0.0',
  plugins: []
};

console.log('@@@@@@@@@@@ Starting HAPI server @@@@@@@@@@@@@');
startServer(hapiConfig);
