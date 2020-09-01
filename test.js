const fetch = require('node-fetch');
const {promisify} = require('util');
const got = require('got');
const {CookieJar} = require('tough-cookie');

// (async () => {	
// 	const opts = {
// 		method: "POST",
// 		headers: {
// 			cookie: 'LG=EN'
// 		}
// 	};
// 	const response = await fetch('http://ss.lv', opts);
// 	console.log('done')

// 	console.log(response.ok);
// 	console.log(response.status);
// 	console.log(response.headers.raw());
// 	console.log(response.headers.get('set-cookie').toString());

	
	
// })();

(async () => {
	
    const cookieJar = new CookieJar();
    const setCookie = cookieJar.setCookie.bind(cookieJar);
 
    await setCookie('foo=bar', 'http://ss.lv');
	await got('http://ss.lv', {cookieJar});
	console.log(cookieJar.getCookies('http://ss.lv'))
	
})();