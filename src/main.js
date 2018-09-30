const funBase64 = require('base64-img');
const mkdirp = require('mkdirp');
const template = require('art-template');
const fs = require('fs');
const path = require('path');
const open = require('open');

const pwd = process.cwd();

function createbase64img() {
    var length;
    var base64Imgs = [];
    var imgs;

    imgs = makeIconSrc();
    length = imgs.length;

    if (!length) {
        console.log('no found image');
        return;
    }

    imgs.forEach(function(img, index) {
        funBase64.base64(img.abPath, function(err, code) {
            if (err) {
                throw (err);
                return;
            }

            img.code = code;
            base64Imgs.push(img);

            if (index == length - 1) {
                mkdirp.sync(path.join(pwd, 'dist'));
                makeOutputFile(base64Imgs);
                console.log('Convert success! Open your dist folder!');
            }
        })
    })
}

function makeOutputFile(base64Imgs) {
    var data = {};
    data.items = base64Imgs;

    var css = template(path.join(__dirname, '../template/tpl.css'), data);
    fs.writeFileSync(path.join(pwd, 'dist') + '/base64img.css', css);
    open(path.join(pwd, 'dist/base64img.css'));
}

function makeIconSrc() {
    let files = fs.readdirSync(pwd);
    let result = [];

    var obj = {};
    var reg = /(.*)\.[^.]+/;

    files.forEach(function(name) {
        if (checkImg(name)) {
            obj.abPath = path.join(pwd, name);
            obj.pngname = name.match(reg)[1];
            result.push(obj);
            obj = {};
        }
    });

    return result;
}

function checkImg(name) {
    let reg = /.png|.jpg|.jpeg|.gif$/;
    return reg.test(name);
}

module.exports = createbase64img;