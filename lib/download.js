const download = require("download-git-repo")
const path = require("path")
const fs = require('fs-extra')
const ora = require("ora")
const logger = require('./logger')
const utils = require("./utils");


module.exports = function(name,next){
    let spinner = ora("正在下载模板");
    spinner.start();
    const destination = utils.getCwd(`template/${name}`);
    download(`luorijin/${name}`,destination,function(err){
        spinner.stop();
        if (err) {
            logger.fatal("下载模板失败"+err.message.trim())
        }else{
            logger.success("下载模板成功")
            try {
                let packUrl = path.join(destination,'package.json');
                let mapUrl = utils.getCwd(`template/map.json`);
                let package = fs.readJsonSync(packUrl);
                let map = fs.readJsonSync(mapUrl);
                map[name] = package.version;
                fs.writeJsonSync(mapUrl, map);
            } catch (error) {
                console.log(error)
            }
            
        }
        next()
    })
}
