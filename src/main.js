const base64Img = require('base64-img');
const mkdirp = require('mkdirp');
const template = require('art-template');
const fs = require('fs');
const path = require('path');

const pwd = process.cwd();

function createbase64img(options) {
    var lenght;

    options.src = makeIconSrc();
    length = options.src.length;
    // options.remPx = 50; // iphone6 375 / 7.5 暂不做成可配置
    if (!length) {
        console.log('no found image');
        return;
    }

    //console.log(options,'options');
    if (lenth > 1) {
        for (var i = options.src.length - 1; i >= 0; i--) {
            base64Img.base64(options.src[i], function(err, code) {
                if (err) {
                    throw (err);
                    return;
                }
                options.pngname = options.pngname || 'base64';
                mkdirp.sync(path.join(pwd, 'dist'));
                fs.writeFileSync(path.join(pwd, 'dist') + '/' + options.pngname + '.png', result.image);
                // result.coordinates; result.properties;
                makeOutputFile(options, code);
            })
        }
        console.log('convert success!');
    } else {
        base64Img.base64(options, function(err, code) {
            if (err) {
                throw (err);
                return;
            }
            options.pngname = options.pngname || 'base64';
            makeOutputFile(options, code);
            console.log('convert success!');
        })
    }
}

function makeOutputFile(opts,code){
    var data = {}, reg = /([a-zA-Z0-9_-]+)\.(?:png|jpg|gif|jpeg)$/i;
    data.rempx = opts.remPx;
    data.width = result.properties.width;
    data.height = result.properties.height;
    data.pngname = opts.pngname;
    data.items = [];
    data.type = opts.type;
    data.algorithm = opts.algorithm;

    for(var key in result.coordinates){
        var json = {};
        json.name = key.match(reg)[1];
        //json.value = JSON.stringify(result.coordinates[key]);
        json.value = result.coordinates[key];
        data.items.push(json);
    }

    var css = template(path.join(__dirname,'../template/tpl.css'),data);
    fs.writeFileSync(path.join(pwd,'dist')+'/base64img.css',css);
       
}


function makeIconSrc() {
    let files = fs.readdirSync(pwd);
    let result = [];
    files.forEach(function(name) {
        if (checkImg(name)) {
            result.push(path.join(pwd, name));
        }
    });
    return result;
}

function checkImg(name) {
    let reg = /.png|.jpg|.jpeg|.gif$/;
    return reg.test(name);
}

module.exports = createbase64img;