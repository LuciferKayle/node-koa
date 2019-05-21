const cp = require('child_process');
const { resolve } = require('path');


(async ()=> {
    const script = resolve(__dirname,'../puppeteer/movie.js');
    const child = cp.fork(script, []);
    let invoke = false;

    // 进程错误
    child.on('error', (err)=>{
        if(invoke) return;
        invoke = true;
        console.log(err);
    })

    // 进程退出
    child.on('exit', (code)=>{
        if(invoke) return;
        invoke = true;
        let err = code === 0 ?  null : new Error('exit code' + code)
        console.log(err);     
    })

    // 进程通讯
    child.on('message', (data)=>{
        let result = data.result;
        console.log(result);
    })

})();