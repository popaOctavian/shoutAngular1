import {Component} from 'angular2/core';
import {Shouts} from "./shouts";
import {ShoutsService} from "./shouts.service";
import 'rxjs/Rx';
import {Input} from "angular2/src/core/metadata";

@Component({ selector: 'my-shouts-input',
    template: `
<div id="input">

<form (ngSubmit)="onSubmit(f.value)" #f="ngForm">
			<input  required type="text" ngControl="user" placeholder="Enter name"  id="user" #input [value]="shout?.user"/>
			<input required type="text"  ngControl="content" placeholder="Enter Message" id="content" #input [value]="shout?.content"/>
			<br />
			<input class="shout-btn" type="submit" name="submit" value="Shout it!"/>
		</form>

</div>

`})
export class ShoutsInputComponent {
    //@Input() shouts:Shouts;
    shout:Shouts=null;
    onSubmit(form:any)
    {
        const shout:Shouts=new Shouts(form.user,form.content);
        this._shoutServce.addMessage(shout).subscribe(
            data=>{
                console.log(data);
                this._shoutServce.shouts.push(data);
            },
            error=>console.error(error)
        );


    }
    constructor(private _shoutServce:ShoutsService){}
}