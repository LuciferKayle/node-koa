const rq = require('request-promise-native');
let baseurl = 'https://v1.itooi.cn/';

let result = [];

async function fenchMovie(doubanId) {
    let url = baseurl + 'netease/mv/top?pageSize=20&page=0';
    let res =  await rq(url);
    res = JSON.parse(res);
    let data = res.data;    
    const promises = data.map(item => {
        getMvUrl(item.id)
    })
    
    for (const promise of promises) {
        const mvUrl = await promise
        result.push({
            mvUrl
        });
        console.log(result);
    }

}

async function getMvUrl(doubanId) {
    let url = baseurl + `netease/mvUrl?id=${doubanId}&quality=1080&isRedirect=0`;
    let res = await rq(url);
    res = JSON.parse(res);
    if(res.code == 200) {
        return res.data;
    }
}

(async function() {
    await fenchMovie();
    console.log(result);
}());