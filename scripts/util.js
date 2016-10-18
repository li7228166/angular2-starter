/**
 * Created by Julie on 2016/10/18.
 */
var fs = require("fs");
var path = require('path');

exports.vendorUrl = (function () {
    var temp = '';
    var files = fs.readdirSync(path.join(__dirname, '..', 'dll'));
    files.forEach(function (val) {
        var exc = new RegExp(/vendor.*.js$/ig);
        if (exc.test(val)) {
            temp = val;
        }
    });
    return temp;
})();

/*
 * 获得当前本机IP
 * */
exports.localIp = (function getIPAdress() {
    var interfaces = require('os').networkInterfaces();
    for (var devName in interfaces) {
        var iface = interfaces[devName];
        for (var i = 0; i < iface.length; i++) {
            var alias = iface[i];
            if (alias.family === 'IPv4' && alias.address !== '127.0.0.1' && !alias.internal) {
                return alias.address;
            }
        }
    }
})();
