import {Component} from 'angular2/core';
import {ShoutsComponent} from "./shouts.component";
import {ShoutsInputComponent} from "./shouts-input.component";
import {RouteConfig} from "angular2/src/router/route_config/route_config_decorator";
import {ROUTER_DIRECTIVES} from "angular2/router";
@Component({
    selector: 'my-app',
    template: ` 
  <div id="container">
       <header>
    		<h1>Shoutbox</h1>
	   </header>
	   <my-shouts></my-shouts>
	   <my-shouts-input></my-shouts-input>
  </div>
    `,directives:[ROUTER_DIRECTIVES,ShoutsComponent,ShoutsInputComponent]
})

@RouteConfig([
    {path:'/', name:'Message',component:ShoutsInputComponent,useAsDefault:true}

])
export class AppComponent {

}