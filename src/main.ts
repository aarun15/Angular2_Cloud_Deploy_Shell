import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
import {AppModule} from './app/app.module';
import { enableProdMode } from '@angular/core';

enableProdMode();

 export function main() {
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
}

export function bootstrapDomReady() {
    document.addEventListener('DOMContentLoaded', main);
  
}

bootstrapDomReady();