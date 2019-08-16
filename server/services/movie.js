const mongoose = require('mongoose');
const Movie = mongoose.model('Movie');
const {fenchMovie, fenchSinger}  =  require('../tasks/mv.js');  


export const getAllMovies = async (page = 1, pageSize = 10, createdAt = 1) => {

    let total = await Movie.countDocuments({}, function (err, count) {
        return err ? 0 : count;
    });
    
    let doc = await Movie.find({})
        .$where('this.video')
        .skip((page - 1) * pageSize)
        .limit(pageSize)
        .sort({ 'meta.createdAt': createdAt })
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

export const loadMoreMvBySingName = async(singer) => {
    fenchSinger(singer);
}

export const loadMoreMv = async(singer) => {
    fenchMovie();
}