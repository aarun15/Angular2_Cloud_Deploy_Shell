

import { platformBrowser } from '@angular/platform-browser';
import { enableProdMode } from '@angular/core';
import { AppModuleNgFactory } from '../aot/src/app/app.module.ngfactory';
enableProdMode();


export function main() {
platformBrowser().bootstrapModuleFactory(AppModuleNgFactory);
}

export function bootstrapDomReady() {
    document.addEventListener('DOMContentLoaded', main);

}

bootstrapDomReady();