var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
System.register("shouts", [], function(exports_1, context_1) {
    "use strict";
    var __moduleName = context_1 && context_1.id;
    var Shouts;
    return {
        setters:[],
        execute: function() {
            Shouts = (function () {
                function Shouts(user, content) {
                    this.content = content;
                    this.user = user;
                }
                return Shouts;
            }());
            exports_1("Shouts", Shouts);
        }
    }
});
System.register("shouts.service", ["angular2/src/core/di/decorators", "shouts", "angular2/http", "rxjs/Observable", 'rxjs/Rx', "angular2/src/http/headers"], function(exports_2, context_2) {
    "use strict";
    var __moduleName = context_2 && context_2.id;
    var decorators_1, shouts_1, http_1, Observable_1, headers_1;
    var ShoutsService;
    return {
        setters:[
            function (decorators_1_1) {
                decorators_1 = decorators_1_1;
            },
            function (shouts_1_1) {
                shouts_1 = shouts_1_1;
            },
            function (http_1_1) {
                http_1 = http_1_1;
            },
            function (Observable_1_1) {
                Observable_1 = Observable_1_1;
            },
            function (_1) {},
            function (headers_1_1) {
                headers_1 = headers_1_1;
            }],
        execute: function() {
            ShoutsService = (function () {
                function ShoutsService(_http) {
                    this._http = _http;
                    this.shouts = [];
                }
                //https://angular2-deployment-shoutbox.herokuapp.com/message
                ShoutsService.prototype.addMessage = function (shouts) {
                    var body = JSON.stringify(shouts);
                    var headers = new headers_1.Headers({ 'Content-Type': 'application/json' });
                    return this._http.post('http://localhost:3000/message', body, { headers: headers })
                        .map(function (response) {
                        var data = response.json().obj;
                        var shout = new shouts_1.Shouts(data.user, data.content);
                        return shout;
                    })
                        .catch(function (error) { return Observable_1.Observable.throw(error.json()); });
                };
                // https://angular2-deployment-shoutbox.herokuapp.com/message
                ShoutsService.prototype.getMessages = function () {
                    return this._http.get('http://localhost:3000/message').map(function (response) {
                        var data = response.json().obj;
                        var objs = [];
                        for (var i = 0; i < data.length; i++) {
                            var shout = new shouts_1.Shouts(data[i].user, data[i].content);
                            objs.push(shout);
                        }
                        ;
                        return objs;
                    }).catch(function (error) { return Observable_1.Observable.throw(error.json()); });
                };
                ShoutsService = __decorate([
                    decorators_1.Injectable(), 
                    __metadata('design:paramtypes', [http_1.Http])
                ], ShoutsService);
                return ShoutsService;
            }());
            exports_2("ShoutsService", ShoutsService);
        }
    }
});
System.register("shouts.component", ['angular2/core', "shouts.service"], function(exports_3, context_3) {
    "use strict";
    var __moduleName = context_3 && context_3.id;
    var core_1, shouts_service_1;
    var ShoutsComponent;
    return {
        setters:[
            function (core_1_1) {
                core_1 = core_1_1;
            },
            function (shouts_service_1_1) {
                shouts_service_1 = shouts_service_1_1;
            }],
        execute: function() {
            ShoutsComponent = (function () {
                function ShoutsComponent(_shoutServce) {
                    this._shoutServce = _shoutServce;
                }
                ShoutsComponent.prototype.ngOnInit = function () {
                    var _this = this;
                    this._shoutServce.getMessages().subscribe(function (shouts) {
                        _this.shouts = shouts;
                        _this._shoutServce.shouts = shouts;
                    });
                };
                ShoutsComponent = __decorate([
                    core_1.Component({ selector: 'my-shouts',
                        template: "  \n<div id=\"shouts\">\n\t\t<ul>\n\t\t\t<li class=\"shout\"  *ngFor=\"#shout of shouts\" >   {{shout.user}}:  {{shout.content}}  </li>\n\t\t\t\n\n\t\t</ul>\n</div>"
                    }), 
                    __metadata('design:paramtypes', [shouts_service_1.ShoutsService])
                ], ShoutsComponent);
                return ShoutsComponent;
            }());
            exports_3("ShoutsComponent", ShoutsComponent);
        }
    }
});
System.register("shouts-input.component", ['angular2/core', "shouts", "shouts.service", 'rxjs/Rx'], function(exports_4, context_4) {
    "use strict";
    var __moduleName = context_4 && context_4.id;
    var core_2, shouts_2, shouts_service_2;
    var ShoutsInputComponent;
    return {
        setters:[
            function (core_2_1) {
                core_2 = core_2_1;
            },
            function (shouts_2_1) {
                shouts_2 = shouts_2_1;
            },
            function (shouts_service_2_1) {
                shouts_service_2 = shouts_service_2_1;
            },
            function (_2) {}],
        execute: function() {
            ShoutsInputComponent = (function () {
                function ShoutsInputComponent(_shoutServce) {
                    this._shoutServce = _shoutServce;
                    //@Input() shouts:Shouts;
                    this.shout = null;
                }
                ShoutsInputComponent.prototype.onSubmit = function (form) {
                    var _this = this;
                    var shout = new shouts_2.Shouts(form.user, form.content);
                    this._shoutServce.addMessage(shout).subscribe(function (data) {
                        console.log(data);
                        _this._shoutServce.shouts.push(data);
                    }, function (error) { return console.error(error); });
                };
                ShoutsInputComponent = __decorate([
                    core_2.Component({ selector: 'my-shouts-input',
                        template: "\n<div id=\"input\">\n\n<form (ngSubmit)=\"onSubmit(f.value)\" #f=\"ngForm\">\n\t\t\t<input  required type=\"text\" ngControl=\"user\" placeholder=\"Enter name\"  id=\"user\" #input [value]=\"shout?.user\"/>\n\t\t\t<input required type=\"text\"  ngControl=\"content\" placeholder=\"Enter Message\" id=\"content\" #input [value]=\"shout?.content\"/>\n\t\t\t<br />\n\t\t\t<input class=\"shout-btn\" type=\"submit\" name=\"submit\" value=\"Shout it!\"/>\n\t\t</form>\n\n</div>\n\n" }), 
                    __metadata('design:paramtypes', [shouts_service_2.ShoutsService])
                ], ShoutsInputComponent);
                return ShoutsInputComponent;
            }());
            exports_4("ShoutsInputComponent", ShoutsInputComponent);
        }
    }
});
System.register("app.component", ['angular2/core', "shouts.component", "shouts-input.component", "angular2/src/router/route_config/route_config_decorator", "angular2/router"], function(exports_5, context_5) {
    "use strict";
    var __moduleName = context_5 && context_5.id;
    var core_3, shouts_component_1, shouts_input_component_1, route_config_decorator_1, router_1;
    var AppComponent;
    return {
        setters:[
            function (core_3_1) {
                core_3 = core_3_1;
            },
            function (shouts_component_1_1) {
                shouts_component_1 = shouts_component_1_1;
            },
            function (shouts_input_component_1_1) {
                shouts_input_component_1 = shouts_input_component_1_1;
            },
            function (route_config_decorator_1_1) {
                route_config_decorator_1 = route_config_decorator_1_1;
            },
            function (router_1_1) {
                router_1 = router_1_1;
            }],
        execute: function() {
            AppComponent = (function () {
                function AppComponent() {
                }
                AppComponent = __decorate([
                    core_3.Component({
                        selector: 'my-app',
                        template: " \n  <div id=\"container\">\n       <header>\n    \t\t<h1>Shoutbox</h1>\n\t   </header>\n\t   <my-shouts></my-shouts>\n\t   <my-shouts-input></my-shouts-input>\n  </div>\n    ", directives: [router_1.ROUTER_DIRECTIVES, shouts_component_1.ShoutsComponent, shouts_input_component_1.ShoutsInputComponent]
                    }),
                    route_config_decorator_1.RouteConfig([
                        { path: '/', name: 'Message', component: shouts_input_component_1.ShoutsInputComponent, useAsDefault: true }
                    ]), 
                    __metadata('design:paramtypes', [])
                ], AppComponent);
                return AppComponent;
            }());
            exports_5("AppComponent", AppComponent);
        }
    }
});
System.register("boot", ['angular2/platform/browser', "app.component", "shouts.service", "angular2/src/router/router_providers", "angular2/src/router/location/location_strategy", "angular2/src/router/location/hash_location_strategy", "angular2/http", "angular2/src/core/di/provider", "angular2/src/facade/lang"], function(exports_6, context_6) {
    "use strict";
    var __moduleName = context_6 && context_6.id;
    var browser_1, app_component_1, shouts_service_3, router_providers_1, location_strategy_1, hash_location_strategy_1, http_2, provider_1, lang_1;
    return {
        setters:[
            function (browser_1_1) {
                browser_1 = browser_1_1;
            },
            function (app_component_1_1) {
                app_component_1 = app_component_1_1;
            },
            function (shouts_service_3_1) {
                shouts_service_3 = shouts_service_3_1;
            },
            function (router_providers_1_1) {
                router_providers_1 = router_providers_1_1;
            },
            function (location_strategy_1_1) {
                location_strategy_1 = location_strategy_1_1;
            },
            function (hash_location_strategy_1_1) {
                hash_location_strategy_1 = hash_location_strategy_1_1;
            },
            function (http_2_1) {
                http_2 = http_2_1;
            },
            function (provider_1_1) {
                provider_1 = provider_1_1;
            },
            function (lang_1_1) {
                lang_1 = lang_1_1;
            }],
        execute: function() {
            lang_1.enableProdMode();
            browser_1.bootstrap(app_component_1.AppComponent, [shouts_service_3.ShoutsService, router_providers_1.ROUTER_PROVIDERS, provider_1.provide(location_strategy_1.LocationStrategy, { useClass: hash_location_strategy_1.HashLocationStrategy }), http_2.HTTP_PROVIDERS]);
        }
    }
});

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNob3V0cy50cyIsInNob3V0cy5zZXJ2aWNlLnRzIiwic2hvdXRzLmNvbXBvbmVudC50cyIsInNob3V0cy1pbnB1dC5jb21wb25lbnQudHMiLCJhcHAuY29tcG9uZW50LnRzIiwiYm9vdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O1lBQUE7Z0JBTUksZ0JBQVksSUFBVyxFQUFFLE9BQWM7b0JBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUMsT0FBTyxDQUFDO29CQUNyQixJQUFJLENBQUMsSUFBSSxHQUFDLElBQUksQ0FBQztnQkFFbkIsQ0FBQztnQkFDTCxhQUFDO1lBQUQsQ0FYQSxBQVdDLElBQUE7WUFYRCwyQkFXQyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lDRkQ7Z0JBRUksdUJBQW9CLEtBQVU7b0JBQVYsVUFBSyxHQUFMLEtBQUssQ0FBSztvQkFEOUIsV0FBTSxHQUFVLEVBQUUsQ0FBQztnQkFDYSxDQUFDO2dCQUNyQyw0REFBNEQ7Z0JBQ3hELGtDQUFVLEdBQVYsVUFBVyxNQUFhO29CQUNwQixJQUFNLElBQUksR0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxDQUFDO29CQUNsQyxJQUFNLE9BQU8sR0FBQyxJQUFJLGlCQUFPLENBQUMsRUFBQyxjQUFjLEVBQUMsa0JBQWtCLEVBQUMsQ0FBQyxDQUFDO29CQUMvRCxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsK0JBQStCLEVBQUMsSUFBSSxFQUFDLEVBQUMsT0FBTyxFQUFDLE9BQU8sRUFBQyxDQUFDO3lCQUN6RSxHQUFHLENBQUMsVUFBQSxRQUFRO3dCQUNULElBQU0sSUFBSSxHQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLENBQUM7d0JBQy9CLElBQUksS0FBSyxHQUFDLElBQUksZUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUM3QyxN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OUIsQ0FBQztnQkFHTixDQUFDO2dCQTdCTDtvQkFBQyxnQkFBUyxDQUFDLEVBQUUsUUFBUSxFQUFFLGlCQUFpQjt3QkFDcEMsUUFBUSxFQUFFLCtkQVliLEVBQUMsQ0FBQzs7d0NBQUE7Z0JBa0JILDJCQUFDO1lBQUQsQ0FqQkEsQUFpQkMsSUFBQTtZQWpCRCx1REFpQkMsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lDZkQ7Z0JBQUE7Z0JBRUEsQ0FBQztnQkFuQkQ7b0JBQUMsZ0JBQVMsQ0FBQzt3QkFDUCxRQUFRLEVBQUUsUUFBUTt3QkFDbEIsUUFBUSxFQUFFLGlMQVFULEVBQUMsVUFBVSxFQUFDLENBQUMsMEJBQWlCLEVBQUMsa0NBQWUsRUFBQyw2Q0FBb0IsQ0FBQztxQkFDeEUsQ0FBQztvQkFFRCxvQ0FBVyxDQUFDO3dCQUNULEVBQUMsSUFBSSxFQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUMsU0FBUyxFQUFDLFNBQVMsRUFBQyw2Q0FBb0IsRUFBQyxZQUFZLEVBQUMsSUFBSSxFQUFDO3FCQUU5RSxDQUFDOztnQ0FBQTtnQkFHRixtQkFBQztZQUFELENBRkEsQUFFQyxJQUFBO1lBRkQsdUNBRUMsQ0FBQTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUNiRCxxQkFBYyxFQUFFLENBQUM7WUFDakIsbUJBQVMsQ0FBQyw0QkFBWSxFQUFDLENBQUMsOEJBQWEsRUFBQyxtQ0FBZ0IsRUFBQyxrQkFBTyxDQUFDLG9DQUFnQixFQUFFLEVBQUMsUUFBUSxFQUFDLDZDQUFvQixFQUFDLENBQUMsRUFBQyxxQkFBYyxDQUFDLENBQUMsQ0FBQyIsImZpbGUiOiIuLi8uLi8uLi9zaG91dGJveC9idW5kbGUuanMiLCJzb3VyY2VzQ29udGVudCI6WyJleHBvcnQgY2xhc3MgU2hvdXRze1xyXG5cclxuICAgIHVzZXI6c3RyaW5nO1xyXG4gICAgY29udGVudDpzdHJpbmc7XHJcblxyXG5cclxuICAgIGNvbnN0cnVjdG9yKHVzZXI6c3RyaW5nLCBjb250ZW50OnN0cmluZyl7XHJcbiAgICAgICAgdGhpcy5jb250ZW50PWNvbnRlbnQ7XHJcbiAgICAgICAgdGhpcy51c2VyPXVzZXI7XHJcblxyXG4gICAgfVxyXG59IiwiaW1wb3J0IHtJbmplY3RhYmxlfSBmcm9tIFwiYW5ndWxhcjIvc3JjL2NvcmUvZGkvZGVjb3JhdG9yc1wiO1xyXG5pbXBvcnQge1Nob3V0c30gZnJvbSBcIi4vc2hvdXRzXCI7XHJcbmltcG9ydCB7SHR0cH0gZnJvbSBcImFuZ3VsYXIyL2h0dHBcIjtcclxuXHJcbmltcG9ydCB7T2JzZXJ2YWJsZX0gZnJvbSBcInJ4anMvT2JzZXJ2YWJsZVwiO1xyXG5pbXBvcnQgJ3J4anMvUngnO1xyXG5pbXBvcnQge0hlYWRlcnN9IGZyb20gXCJhbmd1bGFyMi9zcmMvaHR0cC9oZWFkZXJzXCI7XHJcblxyXG5ASW5qZWN0YWJsZSgpXHJcbmV4cG9ydCBjbGFzcyBTaG91dHNTZXJ2aWNle1xyXG4gICAgc2hvdXRzOlNob3V0c1tdPVtdO1xyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfaHR0cDpIdHRwKXt9XHJcbi8vaHR0cHM6Ly9hbmd1bGFyMi1kZXBsb3ltZW50LXNob3V0Ym94Lmhlcm9rdWFwcC5jb20vbWVzc2FnZVxyXG4gICAgYWRkTWVzc2FnZShzaG91dHM6U2hvdXRzKXtcclxuICAgICAgICBjb25zdCBib2R5PUpTT04uc3RyaW5naWZ5KHNob3V0cyk7XHJcbiAgICAgICAgY29uc3QgaGVhZGVycz1uZXcgSGVhZGVycyh7J0NvbnRlbnQtVHlwZSc6J2FwcGxpY2F0aW9uL2pzb24nfSk7XHJcbiAgICAgICAgcmV0dXJuIHRoaXMuX2h0dHAucG9zdCgnaHR0cDovL2xvY2FsaG9zdDozMDAwL21lc3NhZ2UnLGJvZHkse2hlYWRlcnM6aGVhZGVyc30pXHJcbiAgICAgICAgICAgIC5tYXAocmVzcG9uc2U9PntcclxuICAgICAgICAgICAgICAgIGNvbnN0IGRhdGE9cmVzcG9uc2UuanNvbigpLm9iajtcclxuICAgICAgICAgICAgICAgIGxldCBzaG91dD1uZXcgU2hvdXRzKGRhdGEudXNlcixkYXRhLmNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgcmV0dXJuIHNob3V0O1xyXG4gICAgICAgICAgICB9KVxyXG4gICAgICAgICAgICAuY2F0Y2goZXJyb3I9PiBPYnNlcnZhYmxlLnRocm93KGVycm9yLmpzb24oKSkpO1xyXG4gICAgfVxyXG4gICAvLyBodHRwczovL2FuZ3VsYXIyLWRlcGxveW1lbnQtc2hvdXRib3guaGVyb2t1YXBwLmNvbS9tZXNzYWdlXHJcbiAgICBnZXRNZXNzYWdlcygpe1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLmdldCgnaHR0cDovL2xvY2FsaG9zdDozMDAwL21lc3NhZ2UnKS5tYXAocmVzcG9uc2U9PiB7XHJcbiAgICAgICAgICAgIGNvbnN0IGRhdGEgPSByZXNwb25zZS5qc29uKCkub2JqO1xyXG4gICAgICAgICAgICBsZXQgb2JqczphbnlbXT1bXTtcclxuICAgICAgICAgICAgZm9yKGxldCBpPTA7aTxkYXRhLmxlbmd0aDtpKyspe1xyXG4gICAgICAgICAgICAgICAgbGV0IHNob3V0PW5ldyBTaG91dHMoZGF0YVtpXS51c2VyLGRhdGFbaV0uY29udGVudCk7XHJcbiAgICAgICAgICAgICAgICBvYmpzLnB1c2goc2hvdXQpO1xyXG4gICAgICAgICAgICB9O1xyXG4gICAgICAgICAgICByZXR1cm4gb2JqcztcclxuICAgICAgICB9KS5jYXRjaChlcnJvcj0+IE9ic2VydmFibGUudGhyb3coZXJyb3IuanNvbigpKSk7XHJcbiAgICB9XHJcbn1cclxuIiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xyXG5pbXBvcnQge1Nob3V0c1NlcnZpY2V9IGZyb20gXCIuL3Nob3V0cy5zZXJ2aWNlXCI7XHJcbmltcG9ydCB7T25Jbml0fSBmcm9tIFwiYW5ndWxhcjIvc3JjL2NvcmUvbGlua2VyL2ludGVyZmFjZXNcIjtcclxuaW1wb3J0IHtTaG91dHN9IGZyb20gXCIuL3Nob3V0c1wiO1xyXG5AQ29tcG9uZW50KHtzZWxlY3RvcjogJ215LXNob3V0cycsXHJcbiAgICB0ZW1wbGF0ZTogYCAgXHJcbjxkaXYgaWQ9XCJzaG91dHNcIj5cclxuXHRcdDx1bD5cclxuXHRcdFx0PGxpIGNsYXNzPVwic2hvdXRcIiAgKm5nRm9yPVwiI3Nob3V0IG9mIHNob3V0c1wiID4gICB7e3Nob3V0LnVzZXJ9fTogIHt7c2hvdXQuY29udGVudH19ICA8L2xpPlxyXG5cdFx0XHRcclxuXHJcblx0XHQ8L3VsPlxyXG48L2Rpdj5gXHJcbn0pXHJcblxyXG5cclxuZXhwb3J0IGNsYXNzIFNob3V0c0NvbXBvbmVudCBpbXBsZW1lbnRzICBPbkluaXQge1xyXG4gICAgc2hvdXRzOlNob3V0c1tdO1xyXG4gICAgbmdPbkluaXQoKTogYW55IHtcclxuICAgICAgICB0aGlzLl9zaG91dFNlcnZjZS5nZXRNZXNzYWdlcygpLnN1YnNjcmliZShcclxuICAgICAgICAgICAgc2hvdXRzPT57XHJcbiAgICAgICAgICAgICAgICB0aGlzLnNob3V0cz1zaG91dHM7XHJcbiAgICAgICAgICAgICAgICB0aGlzLl9zaG91dFNlcnZjZS5zaG91dHM9c2hvdXRzO1xyXG4gICAgICAgICAgICB9XHJcbiAgICAgICAgKTtcclxuICAgIH1cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zaG91dFNlcnZjZTpTaG91dHNTZXJ2aWNlKXt9XHJcbn0iLCJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XHJcbmltcG9ydCB7U2hvdXRzfSBmcm9tIFwiLi9zaG91dHNcIjtcclxuaW1wb3J0IHtTaG91dHNTZXJ2aWNlfSBmcm9tIFwiLi9zaG91dHMuc2VydmljZVwiO1xyXG5pbXBvcnQgJ3J4anMvUngnO1xyXG5pbXBvcnQge0lucHV0fSBmcm9tIFwiYW5ndWxhcjIvc3JjL2NvcmUvbWV0YWRhdGFcIjtcclxuXHJcbkBDb21wb25lbnQoeyBzZWxlY3RvcjogJ215LXNob3V0cy1pbnB1dCcsXHJcbiAgICB0ZW1wbGF0ZTogYFxyXG48ZGl2IGlkPVwiaW5wdXRcIj5cclxuXHJcbjxmb3JtIChuZ1N1Ym1pdCk9XCJvblN1Ym1pdChmLnZhbHVlKVwiICNmPVwibmdGb3JtXCI+XHJcblx0XHRcdDxpbnB1dCAgcmVxdWlyZWQgdHlwZT1cInRleHRcIiBuZ0NvbnRyb2w9XCJ1c2VyXCIgcGxhY2Vob2xkZXI9XCJFbnRlciBuYW1lXCIgIGlkPVwidXNlclwiICNpbnB1dCBbdmFsdWVdPVwic2hvdXQ/LnVzZXJcIi8+XHJcblx0XHRcdDxpbnB1dCByZXF1aXJlZCB0eXBlPVwidGV4dFwiICBuZ0NvbnRyb2w9XCJjb250ZW50XCIgcGxhY2Vob2xkZXI9XCJFbnRlciBNZXNzYWdlXCIgaWQ9XCJjb250ZW50XCIgI2lucHV0IFt2YWx1ZV09XCJzaG91dD8uY29udGVudFwiLz5cclxuXHRcdFx0PGJyIC8+XHJcblx0XHRcdDxpbnB1dCBjbGFzcz1cInNob3V0LWJ0blwiIHR5cGU9XCJzdWJtaXRcIiBuYW1lPVwic3VibWl0XCIgdmFsdWU9XCJTaG91dCBpdCFcIi8+XHJcblx0XHQ8L2Zvcm0+XHJcblxyXG48L2Rpdj5cclxuXHJcbmB9KVxyXG5leHBvcnQgY2xhc3MgU2hvdXRzSW5wdXRDb21wb25lbnQge1xyXG4gICAgLy9ASW5wdXQoKSBzaG91dHM6U2hvdXRzO1xyXG4gICAgc2hvdXQ6U2hvdXRzPW51bGw7XHJcbiAgICBvblN1Ym1pdChmb3JtOmFueSlcclxuICAgIHtcclxuICAgICAgICBjb25zdCBzaG91dDpTaG91dHM9bmV3IFNob3V0cyhmb3JtLnVzZXIsZm9ybS5jb250ZW50KTtcclxuICAgICAgICB0aGlzLl9zaG91dFNlcnZjZS5hZGRNZXNzYWdlKHNob3V0KS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIGRhdGE9PntcclxuICAgICAgICAgICAgICAgIGNvbnNvbGUubG9nKGRhdGEpO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvdXRTZXJ2Y2Uuc2hvdXRzLnB1c2goZGF0YSk7XHJcbiAgICAgICAgICAgIH0sXHJcbiAgICAgICAgICAgIGVycm9yPT5jb25zb2xlLmVycm9yKGVycm9yKVxyXG4gICAgICAgICk7XHJcblxyXG5cclxuICAgIH1cclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX3Nob3V0U2VydmNlOlNob3V0c1NlcnZpY2Upe31cclxufSIsImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcbmltcG9ydCB7U2hvdXRzQ29tcG9uZW50fSBmcm9tIFwiLi9zaG91dHMuY29tcG9uZW50XCI7XG5pbXBvcnQge1Nob3V0c0lucHV0Q29tcG9uZW50fSBmcm9tIFwiLi9zaG91dHMtaW5wdXQuY29tcG9uZW50XCI7XG5pbXBvcnQge1JvdXRlQ29uZmlnfSBmcm9tIFwiYW5ndWxhcjIvc3JjL3JvdXRlci9yb3V0ZV9jb25maWcvcm91dGVfY29uZmlnX2RlY29yYXRvclwiO1xuaW1wb3J0IHtST1VURVJfRElSRUNUSVZFU30gZnJvbSBcImFuZ3VsYXIyL3JvdXRlclwiO1xuQENvbXBvbmVudCh7XG4gICAgc2VsZWN0b3I6ICdteS1hcHAnLFxuICAgIHRlbXBsYXRlOiBgIFxuICA8ZGl2IGlkPVwiY29udGFpbmVyXCI+XG4gICAgICAgPGhlYWRlcj5cbiAgICBcdFx0PGgxPlNob3V0Ym94PC9oMT5cblx0ICAgPC9oZWFkZXI+XG5cdCAgIDxteS1zaG91dHM+PC9teS1zaG91dHM+XG5cdCAgIDxteS1zaG91dHMtaW5wdXQ+PC9teS1zaG91dHMtaW5wdXQ+XG4gIDwvZGl2PlxuICAgIGAsZGlyZWN0aXZlczpbUk9VVEVSX0RJUkVDVElWRVMsU2hvdXRzQ29tcG9uZW50LFNob3V0c0lucHV0Q29tcG9uZW50XVxufSlcblxuQFJvdXRlQ29uZmlnKFtcbiAgICB7cGF0aDonLycsIG5hbWU6J01lc3NhZ2UnLGNvbXBvbmVudDpTaG91dHNJbnB1dENvbXBvbmVudCx1c2VBc0RlZmF1bHQ6dHJ1ZX1cblxuXSlcbmV4cG9ydCBjbGFzcyBBcHBDb21wb25lbnQge1xuXG59IiwiXG5pbXBvcnQge2Jvb3RzdHJhcH0gZnJvbSAnYW5ndWxhcjIvcGxhdGZvcm0vYnJvd3Nlcic7XG5pbXBvcnQge0FwcENvbXBvbmVudH0gZnJvbSBcIi4vYXBwLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtTaG91dHNTZXJ2aWNlfSBmcm9tIFwiLi9zaG91dHMuc2VydmljZVwiO1xuaW1wb3J0IHtST1VURVJfUFJPVklERVJTfSBmcm9tIFwiYW5ndWxhcjIvc3JjL3JvdXRlci9yb3V0ZXJfcHJvdmlkZXJzXCI7XG5pbXBvcnQge0xvY2F0aW9uU3RyYXRlZ3l9IGZyb20gXCJhbmd1bGFyMi9zcmMvcm91dGVyL2xvY2F0aW9uL2xvY2F0aW9uX3N0cmF0ZWd5XCI7XG5pbXBvcnQge0hhc2hMb2NhdGlvblN0cmF0ZWd5fSBmcm9tIFwiYW5ndWxhcjIvc3JjL3JvdXRlci9sb2NhdGlvbi9oYXNoX2xvY2F0aW9uX3N0cmF0ZWd5XCI7XG5pbXBvcnQge0hUVFBfUFJPVklERVJTfSBmcm9tIFwiYW5ndWxhcjIvaHR0cFwiO1xuaW1wb3J0IHtwcm92aWRlfSBmcm9tIFwiYW5ndWxhcjIvc3JjL2NvcmUvZGkvcHJvdmlkZXJcIjtcbmltcG9ydCB7ZW5hYmxlUHJvZE1vZGV9IGZyb20gXCJhbmd1bGFyMi9zcmMvZmFjYWRlL2xhbmdcIjtcblxuZW5hYmxlUHJvZE1vZGUoKTtcbmJvb3RzdHJhcChBcHBDb21wb25lbnQsW1Nob3V0c1NlcnZpY2UsUk9VVEVSX1BST1ZJREVSUyxwcm92aWRlKExvY2F0aW9uU3RyYXRlZ3ksIHt1c2VDbGFzczpIYXNoTG9jYXRpb25TdHJhdGVneX0pLEhUVFBfUFJPVklERVJTXSk7Il0sInNvdXJjZVJvb3QiOiIvc291cmNlLyJ9
