import {Injectable} from "angular2/src/core/di/decorators";
import {Shouts} from "./shouts";
import {Http} from "angular2/http";

import {Observable} from "rxjs/Observable";
import 'rxjs/Rx';
import {Headers} from "angular2/src/http/headers";

@Injectable()
export class ShoutsService{
    shouts:Shouts[]=[];
    constructor(private _http:Http){}
//https://angular2-deployment-shoutbox.herokuapp.com/message
    addMessage(shouts:Shouts){
        const body=JSON.stringify(shouts);
        const headers=new Headers({'Content-Type':'application/json'});
        return this._http.post('http://angular2-deployment-shoutbox.herokuapp.com/message',body,{headers:headers})
            .map(response=>{
                const data=response.json().obj;
                let shout=new Shouts(data.user,data.content);
                return shout;
            })
            .catch(error=> Observable.throw(error.json()));
    }
   // https://angular2-deployment-shoutbox.herokuapp.com/message
    getMessages(){
        return this._http.get('http://angular2-deployment-shoutbox.herokuapp.com/message').map(response=> {
            const data = response.json().obj;
            let objs:any[]=[];
            for(let i=0;i<data.length;i++){
                let shout=new Shouts(data[i].user,data[i].content);
                objs.push(shout);
            };
            return objs;
        }).catch(error=> Observable.throw(error.json()));
    }
}
