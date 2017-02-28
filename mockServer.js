

var fs = require('fs');
var express = require('express');
var app = express();

var dir = "./interface";

fs.readdir(dir, function(err, files) {
    if (err) {
        console.log('读取服务器接口目录失败！');
    }
    else {
        for (var i in files)
        {
            var filename = files[i];
            var last = filename.lastIndexOf('.');
            if (last > 0)
            {
                filename = filename.substring(0,last);
                console.log(filename);
                app.get('/1.0/' + filename, function (req, res){

                    processNetworkRequest(req,res);

                });

                app.post('/1.0/' + filename, function (req, res){

                    processNetworkRequest(req,res);

                });
            }
        }

        // app.get('/*', function (req, res){

        //     res.send('GET 暂不支持：' + req.path);
        // });

        app.post('/*', function (req, res) {

            res.send('POST 暂不支持：' + req.path);

        });
    }
});


var server = app.listen(8088, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log('server 地址为 http://%s:%s', host, port);
});


function processNetworkRequest(req, res)
{
    console.log("\n正在请求：" + req.path);

    var name =dir+ "/" + req.path + ".json";
    fs.readFile(name, function (err, data) {
        if (err) {
            var msg = "请求失败：" + req.path;
            console.log(msg);
            res.send(msg);
        }
        else {
            var content = data.toString();
            console.log("请求成功：\n" + content);
            res.send(content);
        }
    });
}



