import { binding, given, then, when} from 'cucumber-tsflow';
import {assert} from 'chai';
import fetch from 'node-fetch';
import {CookieJar} from 'tough-cookie';
import got from 'got';
import {cookie} from 'request';
import util from 'util';

@binding()
export class CookieSteps {
  public cookieJar = new CookieJar();
  
  public website: string= 'https://www.github.com';
  @given(/A set of three cookies/)  
  public GetThoseThreeCookies(cookiesApplied: boolean) {
    (async () => {
      const setCookie = this.cookieJar.setCookie.bind(this.cookieJar);
      setCookie('cookie1=test1', this.website);
      setCookie('cookie2=test2', this.website);
      setCookie('cookie3=test3', this.website);
      this.cookieJar = new CookieJar();
      got(this.website, {this.cookieJar});
      console.log(this.cookieJar.getCookies(this.website));
    })();
  }

  @when(/Making a GET call/)
  public MakingGETcall(cookiesFound: boolean) { 
    const cookieJar = new CookieJar();
    const setCookie = util.promisify(cookieJar.setCookie.bind(cookieJar));
 
     setCookie('foo=bar', 'https://example.com');
     got('https://example.com', {cookieJar});
  }
}