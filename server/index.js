const Koa = require('koa')
const { resolve } = require('path')
// const views = require('koa-views')
const { connect, initSchema } = require('./database/init');
const R = require('ramda');

const MIDDLEWARES = ['router'];

// const router = require('./routers/index.js');  // 引入路由

const useMiddlewares = (app) => {
    R.map(
        R.compose(
            R.forEachObjIndexed(
                initWith => initWith(app)
            ),
            require,
            name => resolve(__dirname, `./middlewares/${name}`)
        )
    )(MIDDLEWARES);
}

// 路由注入

; (async () => {

    await connect()

    // 初始化schema

    initSchema();

    // 爬取数据的脚本

    // require('./tasks/mv.js');

    // 实时更新mv播放地址（防止过期）

    // require('./tasks/api.js');
    // require('./tasks/upload.js');

    const app = new Koa();
    await useMiddlewares(app);


    app.listen(4455)
})()



