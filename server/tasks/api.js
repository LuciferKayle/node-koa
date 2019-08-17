var request = require("request");
const mongoose = require('mongoose');
const Movie = mongoose.model('Movie');

let baseurl = 'https://v1.itooi.cn/';


; (async () => {
    let movies = await Movie.find({
        $or: [
            { videoKey: null },
            { coverKey: null }
        ],
    })



    for (var i = 0; i < movies.length; i++) {

        let movie = movies[i];

        let url = baseurl + `netease/mvUrl?id=${movie.MvId}&quality=1080&isRedirect=0`;

        request(url, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let result = JSON.parse(body);

                try {
                    if(result.code !== 200) {
                        movie.remove({MvId: movie.MvId},function(err) {
                            console.log(err);
                        })
                    } else {
                        movie.video = result.data;
                        movie.save();
                    }
                } catch (err) {
                    console.log(err);
                }
            }
        });

    }

})()



