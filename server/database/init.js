

const ip = 'localhost'
const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const db = 'mongodb://admin:123456@localhost:27017/douban-trailer'

const glob = require('glob')

const { resolve } = require('path')


exports.initSchema = ()=> {
    glob.sync(resolve(__dirname,'./schema','**/*.js')).forEach(require)
}



exports.initAdmin = () => {

}


exports.connect = () => {
    let maxConnectTime = 0

    return new Promise((resolve,reject)=>{
        if(process.env.NODE_ENV !== 'production') {
            mongoose.set('debug', true);
        }

        mongoose.set('useCreateIndex', true);

        mongoose.connect(db,{
            useNewUrlParser: true
        })
    
        var dbCon = mongoose.connection;
        
        dbCon.on('disconnected', ()=>{
            maxConnectTime++;            
            if(maxConnectTime < 5) {
                mongoose.connect(db);   
            } else {
                throw new Error('数据库挂啦，快来修吧')
            }
        })
    
        dbCon.on('error', (err)=>{
            reject(err);
            console.log(err);
        })
    
        dbCon.once('open', ()=>{
            resolve();
            console.log('mongodb connect successfully');
        })
    })

}