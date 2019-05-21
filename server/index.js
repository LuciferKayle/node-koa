const Koa = require('koa')
const app = new Koa()
const fs = require("fs")


// 默认模板 
const { normalTpl } = require('./tpl/index');


app.use(async(ctx) => {
    ctx.res.contentType = 'text/html; charset=utf-8'
    ctx.type = 'text/html; charset=utf-8'
    ctx.body = normalTpl
})

app.listen(6080)
