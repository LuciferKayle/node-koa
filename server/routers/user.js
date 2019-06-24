// 注册路由
const {
    controller,
    post
} =  require('../libs/decorator');

const {
    checkPassword
} = require('../services/admin');


@controller('/api/v0/user')

export class userController {
    @post('/')
    async checkPassword(ctx,next) {
        const {email, password} = ctx.request.body;
        const matchData =  checkPassword(email,password);

        if(matchData.match) {
            return ctx.body = {
                success: true
            }
        }

        if(!matchData.user) {
            return ctx.body = {
                success: false,
                msg: '用户不存在'
            }
        }

        if(!matchData.match) {
            return ctx.body = {
                success: false,
                msg: '密码不正确'
            }
        }
    }
}
