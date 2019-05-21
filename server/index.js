const Koa = require('koa')
const app = new Koa()
const { resolve } = require('path')
const views = require('koa-views')

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

app.listen(6080)
