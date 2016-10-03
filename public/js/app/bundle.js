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
                ShoutsService.prototype.addMessage = function (shouts) {
                    var body = JSON.stringify(shouts);
                    var headers = new headers_1.Headers({ 'Content-Type': 'application/json' });
                    return this._http.post('http://angular2-deployment-shoutbox.herokuapp.com/message', body, { headers: headers })
                        .map(function (response) {
                        var data = response.json().obj;
                        var shout = new shouts_1.Shouts(data.user, data.content);
                        return shout;
                    })
                        .catch(function (error) { return Observable_1.Observable.throw(error.json()); });
                };
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNob3V0cy50cyIsInNob3V0cy5zZXJ2aWNlLnRzIiwic2hvdXRzLmNvbXBvbmVudC50cyIsInNob3V0cy1pbnB1dC5jb21wb25lbnQudHMiLCJhcHAuY29tcG9uZW50LnRzIiwiYm9vdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7O1lBQUE7Z0JBTUksZ0JBQVksSUFBVyxFQUFFLE9BQWM7b0JBQ25DLElBQUksQ0FBQyxPQUFPLEdBQUMsT0FBTyxDQUFDO29CQUNyQixJQUFJLENBQUMsSUFBSSxHQUFDLElBQUksQ0FBQztnQkFFbkIsQ0FBQztnQkFDTCxhQUFDO1lBQUQsQ0FYQSxBQVdDLElBQUE7WUFYRCwyQkFXQyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1lDRkQ7Z0JBRUksdUJBQW9CLEtBQVU7b0JBQVYsVUFBSyxHQUFMLEtBQUssQ0FBSztvQkFEOUIsV0FBTSxHQUFVLEVBQUUsQ0FBQztnQkFDYSxDQUFDO2dCQUVqQyxrQ0FBVSxHQUFWLFVBQVcsTUFBYTtvQkFDcEIsSUFBTSxJQUFJLEdBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztvQkFDbEMsSUFBTSxPQUFPLEdBQUMsSUFBSSxpQkFBTyxDQUFDLEVBQUMsY0FBYyxFQUFDLGtCQUFrQixFQUFDLENBQUMsQ0FBQztvQkFDL0QsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLDJEQUEyRCxFQUFDLElBQUksRUFBQyxFQUFDLE9BQU8sRUFBQyxPQUFPLEVBQUMsQ0FBQzt5QkFDckcsR0FBRyxDQUFDLFVBQUEsUUFBUTt3QkFDVCxJQUFNLElBQUksR0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxDQUFDO3dCQUMvQixJQUFJLEtBQUssR0FBQyxJQUFJLGVBQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQzt3QkFDN0MsTUFBTSxDQUFDLEtBQUss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QUFDLGdCQUFTLENBQUMsRUFBRSxRQUFRLEVBQUUsaUJBQWlCO3dCQUNwQyxRQUFRLEVBQUUsK2RBWWIsRUFBQyxDQUFDOzt3Q0FBQTtnQkFrQkgsMkJBQUM7WUFBRCxDQWpCQSxBQWlCQyxJQUFBO1lBakJELHVEQWlCQyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7WUNmRDtnQkFBQTtnQkFFQSxDQUFDO2dCQW5CRDtvQkFBQyxnQkFBUyxDQUFDO3dCQUNQLFFBQVEsRUFBRSxRQUFRO3dCQUNsQixRQUFRLEVBQUUsaUxBUVQsRUFBQyxVQUFVLEVBQUMsQ0FBQywwQkFBaUIsRUFBQyxrQ0FBZSxFQUFDLDZDQUFvQixDQUFDO3FCQUN4RSxDQUFDO29CQUVELG9DQUFXLENBQUM7d0JBQ1QsRUFBQyxJQUFJLEVBQUMsR0FBRyxFQUFFLElBQUksRUFBQyxTQUFTLEVBQUMsU0FBUyxFQUFDLDZDQUFvQixFQUFDLFlBQVksRUFBQyxJQUFJLEVBQUM7cUJBRTlFLENBQUM7O2dDQUFBO2dCQUdGLG1CQUFDO1lBQUQsQ0FGQSxBQUVDLElBQUE7WUFGRCx1Q0FFQyxDQUFBOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztZQ2JELHFCQUFjLEVBQUUsQ0FBQztZQUNqQixtQkFBUyxDQUFDLDRCQUFZLEVBQUMsQ0FBQyw4QkFBYSxFQUFDLG1DQUFnQixFQUFDLGtCQUFPLENBQUMsb0NBQWdCLEVBQUUsRUFBQyxRQUFRLEVBQUMsNkNBQW9CLEVBQUMsQ0FBQyxFQUFDLHFCQUFjLENBQUMsQ0FBQyxDQUFDIiwiZmlsZSI6Ii4uLy4uLy4uL0xhdGVzdCBQcm9qZWN0IFZlcnNpb24vYnVuZGxlLmpzIiwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGNsYXNzIFNob3V0c3tcclxuXHJcbiAgICB1c2VyOnN0cmluZztcclxuICAgIGNvbnRlbnQ6c3RyaW5nO1xyXG5cclxuXHJcbiAgICBjb25zdHJ1Y3Rvcih1c2VyOnN0cmluZywgY29udGVudDpzdHJpbmcpe1xyXG4gICAgICAgIHRoaXMuY29udGVudD1jb250ZW50O1xyXG4gICAgICAgIHRoaXMudXNlcj11c2VyO1xyXG5cclxuICAgIH1cclxufSIsImltcG9ydCB7SW5qZWN0YWJsZX0gZnJvbSBcImFuZ3VsYXIyL3NyYy9jb3JlL2RpL2RlY29yYXRvcnNcIjtcclxuaW1wb3J0IHtTaG91dHN9IGZyb20gXCIuL3Nob3V0c1wiO1xyXG5pbXBvcnQge0h0dHB9IGZyb20gXCJhbmd1bGFyMi9odHRwXCI7XHJcblxyXG5pbXBvcnQge09ic2VydmFibGV9IGZyb20gXCJyeGpzL09ic2VydmFibGVcIjtcclxuaW1wb3J0ICdyeGpzL1J4JztcclxuaW1wb3J0IHtIZWFkZXJzfSBmcm9tIFwiYW5ndWxhcjIvc3JjL2h0dHAvaGVhZGVyc1wiO1xyXG5cclxuQEluamVjdGFibGUoKVxyXG5leHBvcnQgY2xhc3MgU2hvdXRzU2VydmljZXtcclxuICAgIHNob3V0czpTaG91dHNbXT1bXTtcclxuICAgIGNvbnN0cnVjdG9yKHByaXZhdGUgX2h0dHA6SHR0cCl7fVxyXG5cclxuICAgIGFkZE1lc3NhZ2Uoc2hvdXRzOlNob3V0cyl7XHJcbiAgICAgICAgY29uc3QgYm9keT1KU09OLnN0cmluZ2lmeShzaG91dHMpO1xyXG4gICAgICAgIGNvbnN0IGhlYWRlcnM9bmV3IEhlYWRlcnMoeydDb250ZW50LVR5cGUnOidhcHBsaWNhdGlvbi9qc29uJ30pO1xyXG4gICAgICAgIHJldHVybiB0aGlzLl9odHRwLnBvc3QoJ2h0dHA6Ly9hbmd1bGFyMi1kZXBsb3ltZW50LXNob3V0Ym94Lmhlcm9rdWFwcC5jb20vbWVzc2FnZScsYm9keSx7aGVhZGVyczpoZWFkZXJzfSlcclxuICAgICAgICAgICAgLm1hcChyZXNwb25zZT0+e1xyXG4gICAgICAgICAgICAgICAgY29uc3QgZGF0YT1yZXNwb25zZS5qc29uKCkub2JqO1xyXG4gICAgICAgICAgICAgICAgbGV0IHNob3V0PW5ldyBTaG91dHMoZGF0YS51c2VyLGRhdGEuY29udGVudCk7XHJcbiAgICAgICAgICAgICAgICByZXR1cm4gc2hvdXQ7XHJcbiAgICAgICAgICAgIH0pXHJcbiAgICAgICAgICAgIC5jYXRjaChlcnJvcj0+IE9ic2VydmFibGUudGhyb3coZXJyb3IuanNvbigpKSk7XHJcbiAgICB9XHJcblxyXG4gICAgZ2V0TWVzc2FnZXMoKXtcclxuICAgICAgICByZXR1cm4gdGhpcy5faHR0cC5nZXQoJ2h0dHA6Ly9sb2NhbGhvc3Q6MzAwMC9tZXNzYWdlJykubWFwKHJlc3BvbnNlPT4ge1xyXG4gICAgICAgICAgICBjb25zdCBkYXRhID0gcmVzcG9uc2UuanNvbigpLm9iajtcclxuICAgICAgICAgICAgbGV0IG9ianM6YW55W109W107XHJcbiAgICAgICAgICAgIGZvcihsZXQgaT0wO2k8ZGF0YS5sZW5ndGg7aSsrKXtcclxuICAgICAgICAgICAgICAgIGxldCBzaG91dD1uZXcgU2hvdXRzKGRhdGFbaV0udXNlcixkYXRhW2ldLmNvbnRlbnQpO1xyXG4gICAgICAgICAgICAgICAgb2Jqcy5wdXNoKHNob3V0KTtcclxuICAgICAgICAgICAgfTtcclxuICAgICAgICAgICAgcmV0dXJuIG9ianM7XHJcbiAgICAgICAgfSkuY2F0Y2goZXJyb3I9PiBPYnNlcnZhYmxlLnRocm93KGVycm9yLmpzb24oKSkpO1xyXG4gICAgfVxyXG59XHJcbiIsImltcG9ydCB7Q29tcG9uZW50fSBmcm9tICdhbmd1bGFyMi9jb3JlJztcclxuaW1wb3J0IHtTaG91dHNTZXJ2aWNlfSBmcm9tIFwiLi9zaG91dHMuc2VydmljZVwiO1xyXG5pbXBvcnQge09uSW5pdH0gZnJvbSBcImFuZ3VsYXIyL3NyYy9jb3JlL2xpbmtlci9pbnRlcmZhY2VzXCI7XHJcbmltcG9ydCB7U2hvdXRzfSBmcm9tIFwiLi9zaG91dHNcIjtcclxuQENvbXBvbmVudCh7c2VsZWN0b3I6ICdteS1zaG91dHMnLFxyXG4gICAgdGVtcGxhdGU6IGAgIFxyXG48ZGl2IGlkPVwic2hvdXRzXCI+XHJcblx0XHQ8dWw+XHJcblx0XHRcdDxsaSBjbGFzcz1cInNob3V0XCIgICpuZ0Zvcj1cIiNzaG91dCBvZiBzaG91dHNcIiA+ICAge3tzaG91dC51c2VyfX06ICB7e3Nob3V0LmNvbnRlbnR9fSAgPC9saT5cclxuXHRcdFx0XHJcblxyXG5cdFx0PC91bD5cclxuPC9kaXY+YFxyXG59KVxyXG5cclxuXHJcbmV4cG9ydCBjbGFzcyBTaG91dHNDb21wb25lbnQgaW1wbGVtZW50cyAgT25Jbml0IHtcclxuICAgIHNob3V0czpTaG91dHNbXTtcclxuICAgIG5nT25Jbml0KCk6IGFueSB7XHJcbiAgICAgICAgdGhpcy5fc2hvdXRTZXJ2Y2UuZ2V0TWVzc2FnZXMoKS5zdWJzY3JpYmUoXHJcbiAgICAgICAgICAgIHNob3V0cz0+e1xyXG4gICAgICAgICAgICAgICAgdGhpcy5zaG91dHM9c2hvdXRzO1xyXG4gICAgICAgICAgICAgICAgdGhpcy5fc2hvdXRTZXJ2Y2Uuc2hvdXRzPXNob3V0cztcclxuICAgICAgICAgICAgfVxyXG4gICAgICAgICk7XHJcbiAgICB9XHJcblxyXG4gICAgY29uc3RydWN0b3IocHJpdmF0ZSBfc2hvdXRTZXJ2Y2U6U2hvdXRzU2VydmljZSl7fVxyXG59IiwiaW1wb3J0IHtDb21wb25lbnR9IGZyb20gJ2FuZ3VsYXIyL2NvcmUnO1xyXG5pbXBvcnQge1Nob3V0c30gZnJvbSBcIi4vc2hvdXRzXCI7XHJcbmltcG9ydCB7U2hvdXRzU2VydmljZX0gZnJvbSBcIi4vc2hvdXRzLnNlcnZpY2VcIjtcclxuaW1wb3J0ICdyeGpzL1J4JztcclxuaW1wb3J0IHtJbnB1dH0gZnJvbSBcImFuZ3VsYXIyL3NyYy9jb3JlL21ldGFkYXRhXCI7XHJcblxyXG5AQ29tcG9uZW50KHsgc2VsZWN0b3I6ICdteS1zaG91dHMtaW5wdXQnLFxyXG4gICAgdGVtcGxhdGU6IGBcclxuPGRpdiBpZD1cImlucHV0XCI+XHJcblxyXG48Zm9ybSAobmdTdWJtaXQpPVwib25TdWJtaXQoZi52YWx1ZSlcIiAjZj1cIm5nRm9ybVwiPlxyXG5cdFx0XHQ8aW5wdXQgIHJlcXVpcmVkIHR5cGU9XCJ0ZXh0XCIgbmdDb250cm9sPVwidXNlclwiIHBsYWNlaG9sZGVyPVwiRW50ZXIgbmFtZVwiICBpZD1cInVzZXJcIiAjaW5wdXQgW3ZhbHVlXT1cInNob3V0Py51c2VyXCIvPlxyXG5cdFx0XHQ8aW5wdXQgcmVxdWlyZWQgdHlwZT1cInRleHRcIiAgbmdDb250cm9sPVwiY29udGVudFwiIHBsYWNlaG9sZGVyPVwiRW50ZXIgTWVzc2FnZVwiIGlkPVwiY29udGVudFwiICNpbnB1dCBbdmFsdWVdPVwic2hvdXQ/LmNvbnRlbnRcIi8+XHJcblx0XHRcdDxiciAvPlxyXG5cdFx0XHQ8aW5wdXQgY2xhc3M9XCJzaG91dC1idG5cIiB0eXBlPVwic3VibWl0XCIgbmFtZT1cInN1Ym1pdFwiIHZhbHVlPVwiU2hvdXQgaXQhXCIvPlxyXG5cdFx0PC9mb3JtPlxyXG5cclxuPC9kaXY+XHJcblxyXG5gfSlcclxuZXhwb3J0IGNsYXNzIFNob3V0c0lucHV0Q29tcG9uZW50IHtcclxuICAgIC8vQElucHV0KCkgc2hvdXRzOlNob3V0cztcclxuICAgIHNob3V0OlNob3V0cz1udWxsO1xyXG4gICAgb25TdWJtaXQoZm9ybTphbnkpXHJcbiAgICB7XHJcbiAgICAgICAgY29uc3Qgc2hvdXQ6U2hvdXRzPW5ldyBTaG91dHMoZm9ybS51c2VyLGZvcm0uY29udGVudCk7XHJcbiAgICAgICAgdGhpcy5fc2hvdXRTZXJ2Y2UuYWRkTWVzc2FnZShzaG91dCkuc3Vic2NyaWJlKFxyXG4gICAgICAgICAgICBkYXRhPT57XHJcbiAgICAgICAgICAgICAgICBjb25zb2xlLmxvZyhkYXRhKTtcclxuICAgICAgICAgICAgICAgIHRoaXMuX3Nob3V0U2VydmNlLnNob3V0cy5wdXNoKGRhdGEpO1xyXG4gICAgICAgICAgICB9LFxyXG4gICAgICAgICAgICBlcnJvcj0+Y29uc29sZS5lcnJvcihlcnJvcilcclxuICAgICAgICApO1xyXG5cclxuXHJcbiAgICB9XHJcbiAgICBjb25zdHJ1Y3Rvcihwcml2YXRlIF9zaG91dFNlcnZjZTpTaG91dHNTZXJ2aWNlKXt9XHJcbn0iLCJpbXBvcnQge0NvbXBvbmVudH0gZnJvbSAnYW5ndWxhcjIvY29yZSc7XG5pbXBvcnQge1Nob3V0c0NvbXBvbmVudH0gZnJvbSBcIi4vc2hvdXRzLmNvbXBvbmVudFwiO1xuaW1wb3J0IHtTaG91dHNJbnB1dENvbXBvbmVudH0gZnJvbSBcIi4vc2hvdXRzLWlucHV0LmNvbXBvbmVudFwiO1xuaW1wb3J0IHtSb3V0ZUNvbmZpZ30gZnJvbSBcImFuZ3VsYXIyL3NyYy9yb3V0ZXIvcm91dGVfY29uZmlnL3JvdXRlX2NvbmZpZ19kZWNvcmF0b3JcIjtcbmltcG9ydCB7Uk9VVEVSX0RJUkVDVElWRVN9IGZyb20gXCJhbmd1bGFyMi9yb3V0ZXJcIjtcbkBDb21wb25lbnQoe1xuICAgIHNlbGVjdG9yOiAnbXktYXBwJyxcbiAgICB0ZW1wbGF0ZTogYCBcbiAgPGRpdiBpZD1cImNvbnRhaW5lclwiPlxuICAgICAgIDxoZWFkZXI+XG4gICAgXHRcdDxoMT5TaG91dGJveDwvaDE+XG5cdCAgIDwvaGVhZGVyPlxuXHQgICA8bXktc2hvdXRzPjwvbXktc2hvdXRzPlxuXHQgICA8bXktc2hvdXRzLWlucHV0PjwvbXktc2hvdXRzLWlucHV0PlxuICA8L2Rpdj5cbiAgICBgLGRpcmVjdGl2ZXM6W1JPVVRFUl9ESVJFQ1RJVkVTLFNob3V0c0NvbXBvbmVudCxTaG91dHNJbnB1dENvbXBvbmVudF1cbn0pXG5cbkBSb3V0ZUNvbmZpZyhbXG4gICAge3BhdGg6Jy8nLCBuYW1lOidNZXNzYWdlJyxjb21wb25lbnQ6U2hvdXRzSW5wdXRDb21wb25lbnQsdXNlQXNEZWZhdWx0OnRydWV9XG5cbl0pXG5leHBvcnQgY2xhc3MgQXBwQ29tcG9uZW50IHtcblxufSIsIi8vLzxyZWZlcmVuY2UgcGF0aD1cIi4uLy4uL25vZGVfbW9kdWxlcy9hbmd1bGFyMi90eXBpbmdzL2Jyb3dzZXIuZC50c1wiLz5cbmltcG9ydCB7Ym9vdHN0cmFwfSBmcm9tICdhbmd1bGFyMi9wbGF0Zm9ybS9icm93c2VyJztcbmltcG9ydCB7QXBwQ29tcG9uZW50fSBmcm9tIFwiLi9hcHAuY29tcG9uZW50XCI7XG5pbXBvcnQge1Nob3V0c1NlcnZpY2V9IGZyb20gXCIuL3Nob3V0cy5zZXJ2aWNlXCI7XG5pbXBvcnQge1JPVVRFUl9QUk9WSURFUlN9IGZyb20gXCJhbmd1bGFyMi9zcmMvcm91dGVyL3JvdXRlcl9wcm92aWRlcnNcIjtcbmltcG9ydCB7TG9jYXRpb25TdHJhdGVneX0gZnJvbSBcImFuZ3VsYXIyL3NyYy9yb3V0ZXIvbG9jYXRpb24vbG9jYXRpb25fc3RyYXRlZ3lcIjtcbmltcG9ydCB7SGFzaExvY2F0aW9uU3RyYXRlZ3l9IGZyb20gXCJhbmd1bGFyMi9zcmMvcm91dGVyL2xvY2F0aW9uL2hhc2hfbG9jYXRpb25fc3RyYXRlZ3lcIjtcbmltcG9ydCB7SFRUUF9QUk9WSURFUlN9IGZyb20gXCJhbmd1bGFyMi9odHRwXCI7XG5pbXBvcnQge3Byb3ZpZGV9IGZyb20gXCJhbmd1bGFyMi9zcmMvY29yZS9kaS9wcm92aWRlclwiO1xuaW1wb3J0IHtlbmFibGVQcm9kTW9kZX0gZnJvbSBcImFuZ3VsYXIyL3NyYy9mYWNhZGUvbGFuZ1wiO1xuXG5lbmFibGVQcm9kTW9kZSgpO1xuYm9vdHN0cmFwKEFwcENvbXBvbmVudCxbU2hvdXRzU2VydmljZSxST1VURVJfUFJPVklERVJTLHByb3ZpZGUoTG9jYXRpb25TdHJhdGVneSwge3VzZUNsYXNzOkhhc2hMb2NhdGlvblN0cmF0ZWd5fSksSFRUUF9QUk9WSURFUlNdKTsiXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=
