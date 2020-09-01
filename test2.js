const fetch = require('node-fetch');
const {
    promisify
} = require('util');
const got = require('got');
const {
    CookieJar
} = require('tough-cookie');


// (async () => {
//     const website = 'https://www.github.com'
//     const cookieJar = new CookieJar();
//     const setCookie = cookieJar.setCookie.bind(cookieJar);

//     await setCookie('foo=bar', website);
//     await got(website, {
//         cookieJar
//     });
//     console.log(cookieJar.getCookies(website))
// })


(async () => {

    const cookieJar = new CookieJar();
    const setCookie = cookieJar.setCookie.bind(cookieJar);
    const website = 'https://www.github.com'
    await setCookie('foo=bar', website);
    await got(website, {
        cookieJar
    });
    console.log(cookieJar.getCookies(website))

})();