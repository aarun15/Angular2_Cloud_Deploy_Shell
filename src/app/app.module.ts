import {NgModule,Inject} from '@angular/core'
import {Router,RouterModule} from "@angular/router";
import {rootRouterConfig} from "./app.routes";
import {AppComponent} from "./app";
import {BrowserModule} from "@angular/platform-browser";
import {HttpModule} from "@angular/http";
import {LocationStrategy, HashLocationStrategy} from '@angular/common';
import {HomeModule} from './components/home/home.module';


@NgModule({
 
   declarations: [ AppComponent],
  imports     : [BrowserModule, HttpModule, RouterModule.forRoot(rootRouterConfig),HomeModule],
  providers   : [ {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap   : [AppComponent]
})
export class AppModule {

}
