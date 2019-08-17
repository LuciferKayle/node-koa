// 注册路由
const {
    controller,
    get
} = require('../libs/decorator');

const {
    getAllMovies,
    getMovieDetail,
    loadMoreMvBySingName,
} = require('../services/movie');


@controller('/api/v0/movie')

export class movieController {
    @get('/')
    async getMoviesAll(ctx, next) {
        let {page,pageSize,createdAt} = ctx.query;
        const response = await getAllMovies(parseInt(page),parseInt(pageSize),parseInt(createdAt));
        ctx.body = response;
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


@controller('/api/v0/movieload')
export class movieloadController {
    @get('/')
    async getMoreSingerMv(ctx, next) {
        let {singer} = ctx.query;
        await loadMoreMvBySingName(singer);
        ctx.body = 'ok';
    }
}