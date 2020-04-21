const rq = require('request-promise-native');

const mongoose = require('mongoose');
const Movie = mongoose.model('Movie');

let baseurl = 'http://localhost:3000/mv/url?id=';

async function fenchUrl(id) {
    let url = baseurl + id;
    let res =  await rq(url);
    
    let body;
    try {
        body = JSON.parse(res);
    } catch (err) {
        console.log(err);
    }
    return body;
}

; (async () => {
    let movies = await Movie.find({
        $or: [
            { videoKey: null },
            { coverKey: null }
        ],
    })


    for (var i = 0; i < movies.length; i++) {

        let movie = movies[i];

        try{
            let data = await fenchUrl(movie.MvId);
            if(data.code !== 200) {
                await movie.remove({MvId: movie.MvId},function(err) {
                    console.log(err);
                })
            } else {
                movie.video = data.data.url;
                await movie.save();
            }
        }catch(err) {
            console.log(err);
        };

    }

})()



