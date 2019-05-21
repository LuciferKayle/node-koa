const Koa = require('koa')
const app = new Koa()
const fs = require("fs")
const pug = require('pug');


// 默认模板 
const { pugTpl } = require('./tpl/index');

app.use(async(ctx,next) => {
    ctx.res.contentType = 'text/html; charset=utf-8'
    ctx.type = 'text/html; charset=utf-8'
    ctx.body = pug.render(pugTpl,{
        you: 'Scott',
        me: 'oliver'
    })
})

app.listen(6080)
