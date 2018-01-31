webpackJsonp(["main"],{

/***/ "../../../../../src/$$_lazy_route_resource lazy recursive":
/***/ (function(module, exports) {

function webpackEmptyAsyncContext(req) {
	// Here Promise.resolve().then() is used instead of new Promise() to prevent
	// uncatched exception popping up in devtools
	return Promise.resolve().then(function() {
		throw new Error("Cannot find module '" + req + "'.");
	});
}
webpackEmptyAsyncContext.keys = function() { return []; };
webpackEmptyAsyncContext.resolve = webpackEmptyAsyncContext;
module.exports = webpackEmptyAsyncContext;
webpackEmptyAsyncContext.id = "../../../../../src/$$_lazy_route_resource lazy recursive";

/***/ }),

/***/ "../../../../../src/app/app.component.css":
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__("../../../../css-loader/lib/css-base.js")(false);
// imports


// module
exports.push([module.i, "\n", ""]);

// exports


/*** EXPORTS FROM exports-loader ***/
module.exports = module.exports.toString();

/***/ }),

/***/ "../../../../../src/app/app.component.html":
/***/ (function(module, exports) {

module.exports = "<div class=\"qualifying vert-padding\">\n\n  <div class=\"container\">\n    <div class=\"card card-body\">\n\n      <h1>Resx translations online editor</h1>\n\n      <p-fileUpload name=\"myfile[]\" url=\"./assets/upload.php\" multiple=\"multiple\"\n          accept=\".resx\" auto=\"true\"  (onUpload)=\"onUpload($event)\">\n\n        <ng-template pTemplate=\"toolbar\">\n        </ng-template>\n        <ng-template let-file pTemplate=\"file\">\n          <div *ngIf=\"uploadedFiles.length\">\n            <p-messages [value]=\"msgs\"></p-messages>\n\n              <div class=\"ui-fileupload-row\" *ngFor=\"let file of uploadedFiles; let i = index;\">\n                <div>{{file.name}}</div>\n                <div><button type=\"button\" class=\"btn btn-primary btn-square\" icon=\"ion ion-android-close\" pButton (click)=\"remove($event,i)\"></button></div>\n              </div>\n\n\n          </div>\n        </ng-template>\n        <ng-template pTemplate=\"content\">\n          <div class=\"text-center\">\n            Please upload maximum 3 files by clicking on the button or by dragging them into this zone.\n          </div>\n          <div *ngIf=\"uploadedFiles.length\">\n            <p-messages [value]=\"msgs\"></p-messages>\n\n              <div class=\"ui-fileupload-row\" *ngFor=\"let file of uploadedFiles; let i = index;\">\n                <div>{{file.name}}</div>\n                <div><button type=\"button\" class=\"btn btn-primary btn-square\" icon=\"ion ion-android-close\" pButton (click)=\"removeFile($event,i)\"></button></div>\n              </div>\n\n\n          </div>\n        </ng-template>\n      </p-fileUpload>\n\n      <form name=\"form\" role=\"form\" [formGroup]=\"rForm\" novalidate [hidden]=\"uploadedFiles.length < 1\">\n\n        <div class=\"item thead\">\n          <div *ngFor=\"let tHead of tHeads; index as i\" [ngClass]=\"[i===0 ? 'item-name' : 'item-value']\" [innerHTML]=\"tHead\"></div>\n          <div class=\"item-remove\"></div>\n        </div>\n        <div formArrayName=\"translations\">\n          <div *ngFor=\"let item of this.rForm.controls.translations.controls; index as i\" [formGroupName]=\"i\" class=\"item-container\">\n            <translation [tItem]=\"rForm.controls.translations.controls[i]\" [tHeads]=\"tHeads\" [uploadedFiles]=\"uploadedFiles\" (notify)=\"removeTranslation($event)\"></translation>\n          </div>\n          <div class=\"item-add\">\n            <button type=\"button\" class=\"btn btn-primary btn-square\" (click)=\"addTranslation()\"><span class=\"ion ion-android-add\"></span></button>\n          </div>\n        </div>\n        <br>\n        <button type=\"submit\" name=\"submit\" value=\"submit\" (click)=\"save(rForm)\" class=\"btn btn-primary btn-block\">Save and download</button>\n\n      </form>\n    </div>\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/app/app.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_ngx_modialog_plugins_bootstrap__ = __webpack_require__("../../../../ngx-modialog/plugins/bootstrap/bundle/ngx-modialog-bootstrap.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__providers_load_xml_service__ = __webpack_require__("../../../../../src/providers/load-xml.service.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var AppComponent = /** @class */ (function () {
    function AppComponent(loadXML, fb, modal) {
        this.loadXML = loadXML;
        this.fb = fb;
        this.modal = modal;
        this.tHeads = [];
        this.uploadedFiles = [];
        this.allowed = true;
        this.maxFiles = 3;
    }
    AppComponent.prototype.ngOnInit = function () {
        this.rForm = this.fb.group({
            translations: this.fb.array([]),
        });
        this.tHeads = ['Parameter'];
    };
    AppComponent.prototype.onUpload = function (event) {
        this.msgs = [];
        if (event.files.length > this.maxFiles || this.uploadedFiles.length + event.files.length > this.maxFiles) {
            this.allowed = false;
        }
        else {
            this.allowed = true;
        }
        if (this.allowed) {
            var _app_1 = this;
            // Read in the file
            for (var i = 0; i < event.files.length; i++) {
                var file = event.files[i], reader = new FileReader();
                this.uploadedFiles.push(file);
                _app_1.tHeads.push(file.name);
                // Closure to capture the file information.
                reader.onload = (function (theFile) {
                    return function (e) {
                        // We store a value to determine the key of the values (value0, value1, value2...)
                        var num = 0;
                        for (var i = 0; i < _app_1.uploadedFiles.length; i++) {
                            if (theFile.name === _app_1.uploadedFiles[i].name) {
                                num = i;
                            }
                        }
                        _app_1.parseXML(e.target.result, num);
                    };
                })(file);
                reader.readAsText(file);
            }
            var msgDetail = 'File Uploaded';
            if (event.files.length > 1) {
                msgDetail = 'Files Uploaded';
            }
            this.msgs.push({ severity: 'success', summary: 'Success!', detail: msgDetail });
        }
        else {
            event.files.pop();
            this.msgs.push({ severity: 'warning', summary: 'Failure: ', detail: 'Please upload ' + this.maxFiles + ' files maximum' });
        }
    };
    AppComponent.prototype.parseXML = function (fileText, num) {
        var parseString = __webpack_require__("../../../../xml2js/lib/xml2js.js").parseString, tArr = this.rForm.controls.translations, _app = this;
        var k, arr = [], parser = __webpack_require__("../../../../xml2js/lib/xml2js.js").parseString;
        parseString(fileText, function (err, result) {
            var resArray = result.root.data;
            for (k in resArray) {
                var item = resArray[k], lab = 'value' + num;
                if (num === 0) {
                    //if it's the 1st upload and the item doesn't exist, we create it
                    _app.createTranslationControl(tArr, item, lab);
                }
                else {
                    // if it's the 2nd translation or more, the table has already be initialized
                    // So we check if an instance already exists.
                    // If yes, we replace the values
                    _app.editTranslationControl(tArr, item, lab);
                }
            }
        });
    };
    AppComponent.prototype.removeFile = function (event, index) {
        this.tHeads.splice(index + 1, 1);
        this.uploadedFiles.splice(index, 1);
    };
    AppComponent.prototype.createTranslationControl = function (tArr, item, lab) {
        var _app = this, translation = {
            tName: item.$.name
        };
        for (var j = 0; j < _app.maxFiles; j++) {
            translation['value' + j] = '';
        }
        translation[lab] = item.value[0];
        if (item.comment)
            translation['comment'] = item.comment[0];
        tArr.push(_app.fb.group(translation));
    };
    AppComponent.prototype.editTranslationControl = function (tArr, item, lab) {
        var _app = this;
        for (var j = 0; j < tArr.controls.length; j++) {
            if (tArr.at(j).value.tName === item.$.name) {
                var translation = tArr.at(j).value;
                translation[lab] = item.value;
                tArr.setControl(j, _app.fb.group(translation));
            }
        }
    };
    AppComponent.prototype.save = function (form) {
        var head = "<?xml version=\"1.0\" encoding=\"utf-8\"?>\n  <root>\n    <xsd:schema id=\"root\" xmlns=\"\" xmlns:xsd=\"http://www.w3.org/2001/XMLSchema\" xmlns:msdata=\"urn:schemas-microsoft-com:xml-msdata\">\n      <xsd:import namespace=\"http://www.w3.org/XML/1998/namespace\" />\n      <xsd:element name=\"root\" msdata:IsDataSet=\"true\">\n        <xsd:complexType>\n          <xsd:choice maxOccurs=\"unbounded\">\n            <xsd:element name=\"metadata\">\n              <xsd:complexType>\n                <xsd:sequence>\n                  <xsd:element name=\"value\" type=\"xsd:string\" minOccurs=\"0\" />\n                </xsd:sequence>\n                <xsd:attribute name=\"name\" use=\"required\" type=\"xsd:string\" />\n                <xsd:attribute name=\"type\" type=\"xsd:string\" />\n                <xsd:attribute name=\"mimetype\" type=\"xsd:string\" />\n                <xsd:attribute ref=\"xml:space\" />\n              </xsd:complexType>\n            </xsd:element>\n            <xsd:element name=\"assembly\">\n              <xsd:complexType>\n                <xsd:attribute name=\"alias\" type=\"xsd:string\" />\n                <xsd:attribute name=\"name\" type=\"xsd:string\" />\n              </xsd:complexType>\n            </xsd:element>\n            <xsd:element name=\"data\">\n              <xsd:complexType>\n                <xsd:sequence>\n                  <xsd:element name=\"value\" type=\"xsd:string\" minOccurs=\"0\" msdata:Ordinal=\"1\" />\n                  <xsd:element name=\"comment\" type=\"xsd:string\" minOccurs=\"0\" msdata:Ordinal=\"2\" />\n                </xsd:sequence>\n                <xsd:attribute name=\"name\" type=\"xsd:string\" use=\"required\" msdata:Ordinal=\"1\" />\n                <xsd:attribute name=\"type\" type=\"xsd:string\" msdata:Ordinal=\"3\" />\n                <xsd:attribute name=\"mimetype\" type=\"xsd:string\" msdata:Ordinal=\"4\" />\n                <xsd:attribute ref=\"xml:space\" />\n              </xsd:complexType>\n            </xsd:element>\n            <xsd:element name=\"resheader\">\n              <xsd:complexType>\n                <xsd:sequence>\n                  <xsd:element name=\"value\" type=\"xsd:string\" minOccurs=\"0\" msdata:Ordinal=\"1\" />\n                </xsd:sequence>\n                <xsd:attribute name=\"name\" type=\"xsd:string\" use=\"required\" />\n              </xsd:complexType>\n            </xsd:element>\n          </xsd:choice>\n        </xsd:complexType>\n      </xsd:element>\n    </xsd:schema>\n    <resheader name=\"resmimetype\">\n      <value>text/microsoft-resx</value>\n    </resheader>\n    <resheader name=\"version\">\n      <value>2.0</value>\n    </resheader>\n    <resheader name=\"reader\">\n      <value>System.Resources.ResXResourceReader, System.Windows.Forms, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089</value>\n    </resheader>\n    <resheader name=\"writer\">\n      <value>System.Resources.ResXResourceWriter, System.Windows.Forms, Version=4.0.0.0, Culture=neutral, PublicKeyToken=b77a5c561934e089</value>\n    </resheader>";
        var _loop_1 = function () {
            var tFileEdited = head;
            form.value.translations.forEach(function (x) {
                tFileEdited += "\n      <data name=\"" + x.tName + "\" xml:space=\"preserve\">\n        <value>" + x['value' + i] + "</value>";
                if (x.comment) {
                    tFileEdited += "\n        <comment>" + x.comment + "</comment>";
                }
                tFileEdited += "\n      </data>";
            });
            tFileEdited += "\n  </root>";
            this_1.download(this_1.tHeads[i + 1], tFileEdited);
        };
        var this_1 = this;
        for (var i = 0; i < this.uploadedFiles.length; i++) {
            _loop_1();
        }
    };
    AppComponent.prototype.download = function (filename, text) {
        var element = document.createElement('a');
        element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(text));
        element.setAttribute('download', filename);
        element.style.display = 'none';
        document.body.appendChild(element);
        element.click();
        document.body.removeChild(element);
    };
    AppComponent.prototype.addTranslation = function () {
        var translation = {
            tName: 'Choose_a_parameter_name',
            comment: '',
            isEdit: 'true'
        }, tArr = this.rForm.controls.translations;
        for (var j = 0; j < this.maxFiles; j++) {
            translation['value' + j] = '';
        }
        tArr.push(this.fb.group(translation));
    };
    AppComponent.prototype.removeTranslation = function (t) {
        var _this = this;
        var dialogRef = this.modal.confirm()
            .showClose(true)
            .title('Do you really want to delete the translation ' + t.value.tName + '?')
            .body("\n            <div class=\"vert-padding text-center\">Click \"ok\" to delete the translation, or cancel if you changed your mind</div>")
            .open();
        dialogRef.result
            .then(function (result) {
            if (result) {
                var tArr = _this.rForm.controls.translations;
                var index = tArr.controls.indexOf(t);
                if (index !== -1) {
                    tArr.removeAt(index);
                }
            }
        }, function () { });
    };
    AppComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'app-root',
            template: __webpack_require__("../../../../../src/app/app.component.html"),
            styles: [__webpack_require__("../../../../../src/app/app.component.css")]
        }),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_3__providers_load_xml_service__["a" /* LoadXmlService */], __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormBuilder"], __WEBPACK_IMPORTED_MODULE_2_ngx_modialog_plugins_bootstrap__["b" /* Modal */]])
    ], AppComponent);
    return AppComponent;
}());



/***/ }),

/***/ "../../../../../src/app/app.module.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__("../../../platform-browser/esm5/platform-browser.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__ = __webpack_require__("../../../../primeng/primeng.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_primeng_primeng___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_primeng_primeng__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_ngx_modialog__ = __webpack_require__("../../../../ngx-modialog/bundle/ngx-modialog.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_ngx_modialog_plugins_bootstrap__ = __webpack_require__("../../../../ngx-modialog/plugins/bootstrap/bundle/ngx-modialog-bootstrap.es5.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__providers_load_xml_service__ = __webpack_require__("../../../../../src/providers/load-xml.service.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__app_component__ = __webpack_require__("../../../../../src/app/app.component.ts");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_translation_translation_component__ = __webpack_require__("../../../../../src/components/translation/translation.component.ts");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};










var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_1__angular_core__["NgModule"])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_9__components_translation_translation_component__["a" /* TranslationComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["BrowserModule"],
                __WEBPACK_IMPORTED_MODULE_2__angular_http__["b" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["FormsModule"],
                __WEBPACK_IMPORTED_MODULE_3__angular_forms__["ReactiveFormsModule"],
                __WEBPACK_IMPORTED_MODULE_4_primeng_primeng__["FileUploadModule"],
                __WEBPACK_IMPORTED_MODULE_5_ngx_modialog__["e" /* ModalModule */].forRoot(),
                __WEBPACK_IMPORTED_MODULE_6_ngx_modialog_plugins_bootstrap__["a" /* BootstrapModalModule */]
            ],
            providers: [__WEBPACK_IMPORTED_MODULE_7__providers_load_xml_service__["a" /* LoadXmlService */]],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_8__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());



/***/ }),

/***/ "../../../../../src/components/translation/translation.component.html":
/***/ (function(module, exports) {

module.exports = "<div  class=\"item\" [formGroup]=\"tItem\">\n  <div class=\"item-name\" *ngIf=\"tHeads[0] && tItem\">\n    <input type=\"text\" [readonly]=\"!tItem.get('isEdit')\" class=\"form-control-bordered rcbInput\" id=\"itemName\"  formControlName=\"tName\">\n  </div>\n  <div class=\"item-value\" *ngFor=\"let file of uploadedFiles; let j = index;\">\n    <input type=\"text\" class=\"form-control-bordered rcbInput\" [id]=\"'itemValue' + j\"  formControlName=\"{{'value' + j }}\" *ngIf=\"tItem && tItem.get('value' + j)\">\n  </div>\n  <div class=\"item-remove\">\n    <button (click)=\"removeItem()\" class=\"btn btn-outline-secondary btn-square\"><span class=\"ion ion-ios-trash\"></span></button>\n    <input type=\"hidden\" *ngIf=\"tItem && tItem.get('comment') && tItem.get('comment').value!= ''\" class=\"form-control-bordered rcbInput\" id=\"itemComment\"  formControlName=\"comment\">\n  </div>\n</div>\n"

/***/ }),

/***/ "../../../../../src/components/translation/translation.component.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return TranslationComponent; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_forms__ = __webpack_require__("../../../forms/esm5/forms.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__ = __webpack_require__("../../../../rxjs/_esm5/Subject.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var TranslationComponent = /** @class */ (function () {
    function TranslationComponent() {
        this.tHeads = [];
        this.uploadedFiles = [];
        this.fileNum = [];
        this.subject = new __WEBPACK_IMPORTED_MODULE_2_rxjs_Subject__["Subject"]();
        this.notify = new __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"]();
    }
    TranslationComponent.prototype.ngOnInit = function () {
    };
    TranslationComponent.prototype.removeItem = function () {
        this.notify.emit(this.tItem);
    };
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_1__angular_forms__["FormGroup"])
    ], TranslationComponent.prototype, "tItem", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Array)
    ], TranslationComponent.prototype, "tHeads", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Input"])(),
        __metadata("design:type", Array)
    ], TranslationComponent.prototype, "uploadedFiles", void 0);
    __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Output"])(),
        __metadata("design:type", __WEBPACK_IMPORTED_MODULE_0__angular_core__["EventEmitter"])
    ], TranslationComponent.prototype, "notify", void 0);
    TranslationComponent = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Component"])({
            selector: 'translation',
            template: __webpack_require__("../../../../../src/components/translation/translation.component.html")
        }),
        __metadata("design:paramtypes", [])
    ], TranslationComponent);
    return TranslationComponent;
}());



/***/ }),

/***/ "../../../../../src/main.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__("../../../platform-browser-dynamic/esm5/platform-browser-dynamic.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__("../../../../../src/app/app.module.ts");



//if (environment.production) {
Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["enableProdMode"])();
//}
Object(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */])
    .catch(function (err) { return console.log(err); });


/***/ }),

/***/ "../../../../../src/providers/load-xml.service.ts":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LoadXmlService; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__("../../../core/esm5/core.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__("../../../http/esm5/http.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__("../../../../rxjs/_esm5/Observable.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/map.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_observable_empty__ = __webpack_require__("../../../../rxjs/_esm5/add/observable/empty.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_rxjs_add_operator_catch__ = __webpack_require__("../../../../rxjs/_esm5/add/operator/catch.js");
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_rxjs_add_observable_throw__ = __webpack_require__("../../../../rxjs/_esm5/add/observable/throw.js");
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var LoadXmlService = /** @class */ (function () {
    function LoadXmlService(http) {
        this.http = http;
    }
    LoadXmlService.prototype.handleError = function (error) {
        // retrieve error message to show
        var err = 'argh';
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["a" /* Observable */].throw(err);
    };
    LoadXmlService.prototype.loadXML = function (url, callbackSuccess, callbackError) {
        var _this = this;
        return this.http.get(url)
            .map(function (res) { return res.text(); })
            .catch(function (err) { return _this.handleError(err); });
    };
    LoadXmlService = __decorate([
        Object(__WEBPACK_IMPORTED_MODULE_0__angular_core__["Injectable"])(),
        __metadata("design:paramtypes", [__WEBPACK_IMPORTED_MODULE_1__angular_http__["a" /* Http */]])
    ], LoadXmlService);
    return LoadXmlService;
}());



/***/ }),

/***/ 0:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__("../../../../../src/main.ts");


/***/ }),

/***/ 1:
/***/ (function(module, exports) {

/* (ignored) */

/***/ })

},[0]);
//# sourceMappingURL=main.bundle.js.map