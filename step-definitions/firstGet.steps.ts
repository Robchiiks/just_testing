import { binding, given, then, when} from 'cucumber-tsflow';
import {assert} from 'chai';
import {CookieJar} from 'tough-cookie';
import got from 'got';
import util from 'util';

@binding()
export class CookieSteps {
  public website: string= 'https://www.github.com';
  public cookie1: string = '';
  public cookie2: string = '';
  public cookie3: string = '';
  public cleanCookieJar: string[] = new Array();
  @given(/A set of three cookies/)  
  public GetThoseThreeCookies() {
       this.cookie1 = 'test1=firstTest';
      this.cookie2 = 'test2=secondTest';
       this.cookie3 = 'test3=thirdTest';
  }
  @when(/Making a GET call/)
  public MakingGETcall() { 
    (async () => {
    const cookieJar = new CookieJar();
    const setCookie = util.promisify(cookieJar.setCookie.bind(cookieJar));      
    setCookie(this.cookie1, this.website);
    setCookie(this.cookie2, this.website);
    setCookie(this.cookie3, this.website);
    got(this.website, {cookieJar});
    this.cleanCookieJar = Object.assign(this.cleanCookieJar, cookieJar);
  })();
   
  }
  @then(/expect to have set of three cookies added/)
  public assertCookiesAdded() {
    let assertCookieJar: string[] = new Array();
    clean(this.cleanCookieJar,"test1")
     assertCookieJar = Object.assign(assertCookieJar, this.cleanCookieJar)
     assert.notInclude(assertCookieJar, 'test1', "cookie deleted");
  }
}

function clean(obj: { [x: string]: any; },target: string) {
  var tmpobj = obj;
  for (var key in tmpobj) {
      if (key === target) {
          delete obj[key];
      }
      else if (typeof obj[key] === "object") {
          obj[key] = clean(obj[key],target); 
      }
  }
  return obj;
}