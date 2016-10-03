import {Component} from 'angular2/core';
import {ShoutsService} from "./shouts.service";
import {OnInit} from "angular2/src/core/linker/interfaces";
import {Shouts} from "./shouts";
@Component({selector: 'my-shouts',
    template: `  
<div id="shouts">
		<ul>
			<li class="shout"  *ngFor="#shout of shouts" >   {{shout.user}}:  {{shout.content}}  </li>
			

		</ul>
</div>`
})


export class ShoutsComponent implements  OnInit {
    shouts:Shouts[];
    ngOnInit(): any {
        this._shoutServce.getMessages().subscribe(
            shouts=>{
                this.shouts=shouts;
                this._shoutServce.shouts=shouts;
            }
        );
    }

    constructor(private _shoutServce:ShoutsService){}
}