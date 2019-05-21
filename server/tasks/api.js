const rq = require('request-promise-native');
let baseurl = 'https://v1.itooi.cn/';

async function fenchMovie(doubanId) {
    let url = baseurl + 'netease/mvUrl?id=10866117&quality=1080';
    let res =  await rq(url);
    console.log(res);
}

fenchMovie();
