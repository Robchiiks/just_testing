import { binding, given, then, when} from 'cucumber-tsflow';
import {assert} from 'chai';
import fetch from 'node-fetch';
import {CookieJar} from 'tough-cookie';
import got from 'got';
import {cookie} from 'request';
import util from 'util';


@binding()
export class CookieSteps {
  
  
  // public testCookies = new CookieJar();
  public website: string= 'https://www.github.com';
  public cookie1: string = '';
  public cookie2: string = '';
  public cookie3: string = '';
  public assertCookieJar: string[] = new Array();

  @given(/A set of three cookies/)  
  public GetThoseThreeCookies() {    
      // //var website = 'https://www.github.com';
      // const cookieJar = new CookieJar();
      // const setCookie = util.promisify(cookieJar.setCookie.bind(cookieJar));      
      // setCookie('test1=firstTest', this.website);
      // setCookie('test2=secondTest', this.website);
      // setCookie('test3=thirdTest', this.website);
      // got(this.website, {cookieJar});
      // console.log(cookieJar.getCookies(this.website))  
       this.cookie1 = 'test1=firstTest';
      this.cookie2 = 'test2=secondTest';
       this.cookie3 = 'test3=thirdTest';
    return;
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
    console.log(cookieJar.getCookiesSync(this.website));
    console.log('breajk')
    console.log(typeof cookieJar.getCookiesSync(this.website));
    // this.assertCookieJar.push.apply(this.assertCookieJar, cookieJar);
    // Array.prototype.push.apply(this.assertCookieJar, cookieJar);
    this.assertCookieJar = Object.assign(this.assertCookieJar, cookieJar);
    console.log('TEST')   
    // console.log(this.assertCookieJar);
    return;
  })();
   
  }
  @then(/expect to have set of three cookies added/)
  public assertCookiesAdded() {
    console.log('teeeeest')
    // delete this.assertCookieJar['test1'];
    console.log(clean(this.assertCookieJar,"test1"))
    
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