const rq = require('request-promise-native');
const request = require('request');

const mongoose = require('mongoose');
const Movie = mongoose.model('Movie');

let baseurl = 'http://localhost:3000/mv/first';

async function fenchMovie() {

    let res = await rq(baseurl);
    res = JSON.parse(res);
    let data = res.data;

    data.forEach(async (item) => {
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

        if (!movie) {
            movie = new Movie(info);
            await movie.save();
        }

    });
}

async function fenchSinger(singerName) {

    let url = `http://localhost:3000/search?keywords=${encodeURIComponent(singerName)}&type=1004`

    try {
        let res = await rq.get(url);

        res = JSON.parse(res);



        let data = res.result.mvs;


        data.forEach(async (item) => {
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

            console.log(info)

            if (!movie) {
                movie = new Movie(info);
                await movie.save();
            }

        });
    } catch (error) {
        console.log(error)
    }


}

async function getMvUrl(doubanId) {
    let url = baseurl + `netease/mvUrl?id=${doubanId}&quality=1080&isRedirect=0`;
    let res = await rq(url);
    res = JSON.parse(res);
    if (res.code == 200) {
        return res.data;
    }
}

// (async function() {
//     await fenchSinger('泰勒');
// }());

module.exports = {
    fenchSinger: fenchSinger,
    fenchMovie: fenchMovie,
}
