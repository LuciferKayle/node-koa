const mongoose = require('mongoose');
const Movie = mongoose.model('Movie');

export const getAllMovies = async (page = 1, pageSize = 10) => {

    let total = await Movie.countDocuments({}, function (err, count) {
        return err ? 0 : count;
    });
    
    let doc = await Movie.find({})
        .$where('this.video')
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .sort({ 'meta.createdAt': -1 })
        .exec()

        return {
            total: total,
            movies: doc
        }
}

export const getMovieDetail = async (id) => {
    let movie = await Movie.findOne({ MvId: id });
    return movie;
}