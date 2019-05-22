const {movieData} = require('./mv.js');
console.log(movieData,123);

// const { VodUploadClient, VodUploadRequest } = require('vod-node-sdk');
// client = new VodUploadClient("AKIDHMYYKqN9zbyCBwwMFsLZ4JK6dwBFZbx2", "nNjpjNtFQM8rKxoV1GmCeu9HEygW7asF");
// let req = new VodUploadRequest();
// req.MediaFilePath = "/data/file/Wildlife.mp4";
// client.upload("ap-guangzhou", req, function (err, data) {
//     if (err) {
//         // 处理业务异常
//         console.log(err)
//     } else {
//         // 获取上传成功后的信息
//         console.log(data.FileId);
//         console.log(data.MediaUrl);
//     }
// });