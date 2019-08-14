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

    // 设置定时任务每天更新

    var rule = new schedule.RecurrenceRule();
    rule.dayOfWeek = [0, new schedule.Range(0, 7)];
    rule.hour = 8;
    rule.minute = 0;

    try {
        var j = schedule.scheduleJob(rule, function(){
            try {
                // 爬取数据的脚本
                reqire('./tasks/mv.js');        
                // 实时更新mv播放地址（防止过期）
                require('./tasks/api.js');  
            } catch (error) {
                console.log(error);
            }
    
        });
    } catch (error) {
        console.log(error);
    }
 
    
    // require('./tasks/upload.js');

    const app = new Koa();
    await useMiddlewares(app);

    app.listen(4455)
})()



