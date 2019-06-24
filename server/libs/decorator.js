const Router = require('koa-router');
const _ = require('lodash');
const { resolve } = require('path');
const glob = require('glob');

const symbolPrefix = Symbol('prefix');
const routerMap = new Map();

const  isArray = c => _.isArray(c) ? c : [c];

export class Route {
    constructor(app, apiPath) {
        this.app = app;
        this.apiPath = apiPath;
        this.router = new Router();
    }

    init() {
        // 引入路由文件
        glob.sync(resolve(this.apiPath,'./**/*.js')).forEach(require);
        
        for(let [conf, controller] of routerMap) {
            const controllers = isArray(controller);
            const prefixPath = conf.target[symbolPrefix];
            if(prefixPath) prefixPath = normalizePath(prefixPath);
            const routerPath = prefixPath + conf.path;
            this.router[conf.methods](routerPath, ...controllers);
        }

        // 注册路由
        
        this.app.use(this.router.routes());
        this.app.use(this.router.allowedMethods());

    }

}

const normalizePath = path => path.startsWith('/') ? path : `/${path}`;

// 修饰函数的定义(key) 修饰的方法名
const router = conf => (target,key,descriptor)=> {
    conf.path = normalizePath(conf.path);
    routerMap.set({
        target: target,
        ...conf,
    }, target[key])
}

export const controller = path => target => (target.prototype[symbolPrefix] = path);

export const get = (path) => router({
    methods: 'get',
    path: path
})

export const post = (path) => router({
    methods: 'post',
    path: path
})

export const put = (path) => router({
    methods: 'put',
    path: path
})

export const del  = (path) => router({
    methods: 'del',
    path: path
})

export const use = (path) => router({
    methods: 'use',
    path: path
})

export const all = (path) => router({
    methods: 'all',
    path: path
})
