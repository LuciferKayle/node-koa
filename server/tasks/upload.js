const mongoose = require('mongoose');
const Movie = mongoose.model('Movie');
const nanoid = require('nanoid')
// 引入模块
const COS = require('cos-nodejs-sdk-v5');
// 使用永久密钥创建实例
const cos = new COS({
    SecretId: 'AKIDHMYYKqN9zbyCBwwMFsLZ4JK6dwBFZbx2',
    SecretKey: 'nNjpjNtFQM8rKxoV1GmCeu9HEygW7asF'
});

const configInfo = {
    Bucket: 'olivertest-1257233507',
    Region: 'ap-guangzhou',
}

const { VodUploadClient, VodUploadRequest } = require('vod-node-sdk');
const client = new VodUploadClient("AKIDHMYYKqN9zbyCBwwMFsLZ4JK6dwBFZbx2", "nNjpjNtFQM8rKxoV1GmCeu9HEygW7asF");


// 上传视频

;(async ()=> {
    let movies = await Movie.find({
        $or: [
            { videoKey: { $exists: false } },
            { videoKey: null },
            { videoKey: '' }
        ]
    })

    for(var i = 0; i < movies.length; i++) {

        let movie = movies[0];

        if(movie && !movie.videoKey) {
            try {
                console.log('上传视频中...');
                console.log(movie.video);
                
                let videoData = await uploadVideo(movie.video);

                console.log('上传封面图中...')
                let coverData = await uploadImg(movie.cover,nanoid() + 'png');

                if (videoData.MediaUrl) {
                    movie.videoKey = videoData.FileId;
                    movie.video = videoData.MediaUrl;
                }

                if (coverData.Location) {
                    movie.coverKey = coverData.Key;
                    movie.cover = coverData.Location;
                }

                await movie.save();

            } catch (error) {
                console.log(error);
            }
        }   
    }
})()

// 上传配置


// 上传图片
const uploadImg = async (url,key) => {
    return new Promise((resolve,reject) => {
        cos.sliceUploadFile({
            ...configInfo,
            Key: key,
            FilePath: url
        }, function (err, data) {
            if(err) {
                reject(err);
            }   
            resolve(data);
        });
    }) 
}


// 上传视频
const uploadVideo = async (url,key) => {
    return new Promise((resolve,reject) => {
        let req = new VodUploadRequest();
        req.MediaFilePath = url;
        client.upload("ap-guangzhou", req, function (err, data) {
            if (err) {
                // 处理业务异常
                reject(err);
            } else {
                // 获取上传成功后的信息
                resolve(data);
            }
        });
    }) 
}
