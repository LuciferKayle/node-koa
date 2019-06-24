// 注册路由
const {
    controller,
    get
} = require('../libs/decorator');

const {
    getAllMovies,
    getMovieDetail
} = require('../services/movie');


@controller('/api/v0/movie')

export class movieController {
    @get('/')
    async getMoviesAll(ctx, next) {
        const movies = await getAllMovies();

        ctx.body = {
            movies
        };
    }

    @get('/:id')
    async getOneDetail(ctx, next) {
        const id = ctx.params.id

        let movie = await getMovieDetail(id);
        ctx.body = {
            movie
        };
    }

}
