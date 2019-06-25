const mongoose = require('mongoose');
const Movie = mongoose.model('Movie');

export const getAllMovies = async (page = 1, pageSize = 10) => {

    let total = await Movie.countDocuments({}, function (err, count) {
        return err ? 0 : count;
    });

    console.log(page,'safsfsfsfsfsfsfsfsfsaf');
    
    let doc = await Movie.find({})
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .sort({ 'meta.createdAt': -1 })
        .exec()

        return {
            total: total,
            movies: doc
        }

    // const movies = await Movie.find({}).sort({
    //     'meta.createdAt': -1
    // }).limit(10);

    // return {movies,total};   
}

export const getMovieDetail = async (id) => {
    let movie = await Movie.findOne({ MvId: id });
    return movie;
}