const mongoose = require('mongoose');
const Movie = mongoose.model('Movie');

export const getAllMovies = async () => {
    const movies = await Movie.find({}).sort({
        'meta.createdAt': -1
    })

    return movies;
    
}

export const getMovieDetail = async (id) => {
    let movie = await Movie.findOne({MvId: id});
    return movie;
}