const Koa = require('koa')
const app = new Koa()
const { resolve } = require('path')
const views = require('koa-views')
const { connect , initSchema} = require('./database/init');

const mongoose = require('mongoose');



;(async () => {

    await connect()

    // 初始化schema

    initSchema();

    const Movie = mongoose.model('Movie');

    require('./tasks/mv.js');
    require('./tasks/api.js');


    // require('./tasks/upload.js');

    // 初始化视图标签
    const app = new Koa()  

    // 默认视图中间件
    app.use(views(resolve(__dirname,'./views/'),{
        extension: 'pug'
    }))

    app.use( async ( ctx ) => {
        let info = {
            you:'scott',
            me: 'oliver'
        }
    
        await ctx.render('index', info)
    })
    
    app.listen(4455)
  })()

