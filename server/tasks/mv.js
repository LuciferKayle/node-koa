const rq = require('request-promise-native');
const request = require('request');

const mongoose = require('mongoose');
const Movie = mongoose.model('Movie');

let baseurl = 'http://v1.itooi.cn/';

async function fenchMovie() {
    let url = baseurl + 'netease/mv/top?pageSize=50&page=1';
    let res =  await rq(url);
    res = JSON.parse(res);
    let data = res.data;    

    data.forEach( async (item)=> {
        let movie = await Movie.findOne({
            MvId: item.id
        })

        let info = {
            MvId: item.id,
            score: item.score,
            playCount: item.playCount,
            name: item.name,
            cover: item.cover,
            artistId: item.artistId,
            artistName: item.artistName
        }

        if(!movie) {
            movie = new Movie(info);
            await movie.save();
        }

    });
}

async function fenchSinger(singerName) {
    let params = `keyword=${singerName}&type=mv&pageSize=50&page=0`;
    let url = baseurl + `netease/search?` + encodeURI(params);
    let res =  await rq.get(url,);

    res = JSON.parse(res);
    let data = res.data.mvs;

    data.forEach( async (item)=> {
        let movie = await Movie.findOne({
            MvId: item.id
        })

        let info = {
            MvId: item.id,
            score: item.mark,
            playCount: item.playCount,
            name: item.name,
            cover: item.cover,
            artistId: item.artistId,
            artistName: item.artistName
        }

        if(!movie) {
            movie = new Movie(info);
            await movie.save();
        }

    });

    // 更新mv
    require('./api.js');  
}

async function getMvUrl(doubanId) {
    let url = baseurl + `netease/mvUrl?id=${doubanId}&quality=1080&isRedirect=0`;
    let res = await rq(url);
    res = JSON.parse(res);
    if(res.code == 200) {
        return res.data;
    }
}

// (async function() {
//     await fenchSinger('泰勒');
// }());

module.exports = {
    fenchSinger: fenchSinger,
    fenchMovie: fenchMovie
}
