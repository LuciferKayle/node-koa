const rq = require('request-promise-native');
const mongoose = require('mongoose');
const Movie = mongoose.model('Movie');

let baseurl = 'https://v1.itooi.cn/';

async function fenchUrl(id) {
    let url = baseurl + `netease/mvUrl?id=${id}&quality=1080&isRedirect=0`;
    let res =  await rq(url);
    let body;
    try {
        body = JSON.parse(res);
    } catch (err) {
        console.log(err);
    }
    return body;
}

;(async ()=> {
    let movies = await Movie.find({
        $or: [
            {videoKey: null},
            {coverKey: null}
        ],
    })

    for(var i = 0; i < movies.length; i++) {
        let movie = movies[i];
        try{
            let data = await fenchUrl(movie.MvId);
            console.log(data.code);
            if(data.code !== 200) {
                await movie.remove({MvId: movie.MvId},function(err) {
                    console.log(err);
                })
            } else {
                movie.video = data.data;
                await movie.save();
            }
        }catch(err) {
            console.log(err);
        }
    }

})()



