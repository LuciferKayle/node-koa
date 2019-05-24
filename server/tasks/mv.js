const rq = require('request-promise-native');

const mongoose = require('mongoose');
const Movie = mongoose.model('Movie');

let baseurl = 'https://v1.itooi.cn/';

async function fenchMovie() {
    let url = baseurl + 'netease/mv/top?pageSize=100&page=0';
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
}());