const program = require('commander')
const fs = require("fs-extra")
const utils = require("../lib/utils")
const logger = require("../lib/logger")
const ora = require("ora")
const path = require("path")
program.parse(process.argv);

let tempName = program.args[0];
let sourceDir = process.cwd();
let tempDir = utils.getCwd(`template/${tempName}`)
let packUrl = path.join(sourceDir,'package.json');
let spinner = ora("模板安装中");
spinner.start();
if(fs.existsSync(packUrl)){
    try {
        let filterFile = /.+node_modules.?/;
        fs.copySync(sourceDir, tempDir,(src)=>{
            return !filterFile.test(src);
        })
        let mapUrl = utils.getCwd(`template/map.json`);
        let package = fs.readJsonSync(packUrl);
        let map = fs.readJsonSync(mapUrl);
        map[tempName] = package.version;
        fs.writeJsonSync(mapUrl, map);
        console.log("\n")
        logger.success("模板安装成功")
        spinner.stop();
    } catch (error) {
        console.log(error)
    }
}else{
    logger.fatal("安装目录不含有package.json")
}

