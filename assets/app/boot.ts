///<reference path="../../node_modules/angular2/typings/browser.d.ts"/>
import {bootstrap} from 'angular2/platform/browser';
import {AppComponent} from "./app.component";
import {ShoutsService} from "./shouts.service";
import {ROUTER_PROVIDERS} from "angular2/src/router/router_providers";
import {LocationStrategy} from "angular2/src/router/location/location_strategy";
import {HashLocationStrategy} from "angular2/src/router/location/hash_location_strategy";
import {HTTP_PROVIDERS} from "angular2/http";
import {provide} from "angular2/src/core/di/provider";
import {enableProdMode} from "angular2/src/facade/lang";

enableProdMode();
bootstrap(AppComponent,[ShoutsService,ROUTER_PROVIDERS,provide(LocationStrategy, {useClass:HashLocationStrategy}),HTTP_PROVIDERS]);