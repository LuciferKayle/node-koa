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

    
    const app = new Koa();
    await useMiddlewares(app);

    app.listen(4455);

    const {fenchMovie}  =  require('./tasks/mv.js');  

    // 设置定时任务每天更新

    var rule3     = new schedule.RecurrenceRule();  
    var times3    = [1,5,9,13,17,21];  
    rule3.hour  = times3;  

    try {
        var j = schedule.scheduleJob(rule3, function(){
            try {
                // 爬取数据的脚本
                // 实时更新mv播放地址（防止过期）
                require('./tasks/api.js');  
            } catch (error) {
                console.log(error);
            }
    
        });
    } catch (error) {
        console.log(error);
    }

    // 爬取数据的脚本
    await  fenchMovie();
    // 实时更新mv播放地址（防止过期）
    // require('./tasks/api.js');  
    // require('./tasks/upload.js');
})()



