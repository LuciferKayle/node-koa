const puppeteer = require('puppeteer');
const url = 'https://movie.douban.com/tag/#/?sort=U&range=0,10&tags=%E7%94%B5%E5%BD%B1&start=0'

const sleep = time => new Promise(resolve => {
    setTimeout(resolve,time)
})


;(async ()=> {

    const brower = await puppeteer.launch({
        args: ['--n--sandbox'],
        dumpio: false
    });
    const page = await brower.newPage();
    await page.goto(url,{
        waitUntil: 'networkidle2'
    })
    
    await sleep(3000);


    await page.waitForSelector('.more');

    for(var i = 0; i < 2; i++) {
        await sleep(3000);
        await page.click('.more');
    }


    const result  = await page.evaluate(()=>{

        var $ = window.$;
        var items = $('.list-wp a');

        var links = [];
        if(items.length > 1) {
            items.each((index,item) => {
                let it = $(item);
                let doubanId = it.find('div').data('id');
                let title = it.find('.title').text();
                let rate = it.find('.rate').text();
                rate = Number(rate);
                console.log(rate);
                let poster = it.find('img').attr('src').replace('s_ratio','l_ratio');
                links.push({
                    doubanId,
                    title,
                    rate,
                    poster
                });
            });

            return links;
        }

    })

    brower.close();
    process.send({
        result
    });
    process.exit();
})();