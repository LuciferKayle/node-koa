const Koa = require('koa')
const { resolve } = require('path')
// const views = require('koa-views')
const { connect, initSchema } = require('./database/init');
const R = require('ramda');

var schedule = require('node-schedule');


const MIDDLEWARES = ['router'];


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

    const {fenchMovie}  =  require('./tasks/mv.js');  

    // 设置定时任务每天更新

    var rule3  = new schedule.RecurrenceRule();  
    let times3 = [];
    for(var i = 1; i < 24; i++) {
        times3.push(i);
    }
    rule3.hour  = times3;  

    try {
        var j = schedule.scheduleJob(rule3, function(){
            try {
                fenchMovie();
                require('./tasks/api.js');  
            } catch (error) {
                console.log(error);
            }
    
        });
    } catch (error) {
        console.log(error);
    }

    // 爬取数据的脚本
    require('./tasks/api.js');  

    // 实时更新mv播放地址（防止过期）
    // require('./tasks/upload.js');

    const app = new Koa();
    await useMiddlewares(app);

    app.listen(4455)
})()



