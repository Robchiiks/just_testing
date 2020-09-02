"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.CookieSteps = void 0;
var cucumber_tsflow_1 = require("cucumber-tsflow");
var chai_1 = require("chai");
var tough_cookie_1 = require("tough-cookie");
var got_1 = require("got");
var util_1 = require("util");
var CookieSteps = /** @class */ (function () {
    function CookieSteps() {
        this.website = 'https://www.github.com/';
        this.cookie1 = '';
        this.cookie2 = '';
        this.cookie3 = '';
        this.cleanCookieJar = new Array();
    }
    CookieSteps.prototype.GetThoseThreeCookies = function () {
        this.cookie1 = 'test1=firstTest';
        this.cookie2 = 'test2=secondTest';
        this.cookie3 = 'test3=thirdTest';
    };
    CookieSteps.prototype.MakingGETcall = function () {
        var cookieJar = new tough_cookie_1.CookieJar();
        var setCookie = util_1["default"].promisify(cookieJar.setCookie.bind(cookieJar));
        setCookie(this.cookie1, this.website);
        setCookie(this.cookie2, this.website);
        setCookie(this.cookie3, this.website);
        got_1["default"](this.website, { cookieJar: cookieJar });
        this.cleanCookieJar = Object.assign(this.cleanCookieJar, cookieJar);
    };
    CookieSteps.prototype.assertCookiesAdded = function () {
        var assertCookieJar = new Array();
        clean(this.cleanCookieJar, "test1");
        assertCookieJar = Object.assign(assertCookieJar, this.cleanCookieJar);
        chai_1.expect(assertCookieJar).to.contain('test2');
        chai_1.expect(assertCookieJar).to.not.contain('test1', 'deleted cookie cannot be found anymore'); //could not figure out, why this is not working
    };
    __decorate([
        cucumber_tsflow_1.given(/A set of three cookies/)
    ], CookieSteps.prototype, "GetThoseThreeCookies");
    __decorate([
        cucumber_tsflow_1.when(/Making a GET call that appends cookies/)
    ], CookieSteps.prototype, "MakingGETcall");
    __decorate([
        cucumber_tsflow_1.then(/expect to have set of three cookies added and delete one later/)
    ], CookieSteps.prototype, "assertCookiesAdded");
    CookieSteps = __decorate([
        cucumber_tsflow_1.binding()
    ], CookieSteps);
    return CookieSteps;
}());
exports.CookieSteps = CookieSteps;
function clean(obj, target) {
    var tmpobj = obj;
    for (var key in tmpobj) {
        if (key === target) {
            delete obj[key];
        }
        else if (typeof obj[key] === "object") {
            obj[key] = clean(obj[key], target);
        }
    }
    return obj;
}
