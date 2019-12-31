const inquire = require("inquirer");
const path = require("path");
const fs = require("fs-extra");
const gitUser = require("./git-user");
const utils = require("../lib/utils")
const logger = require("./logger")
const exec = require('child_process').execSync
module.exports = function(tempName,projectName){
    let dir = path.join(process.cwd(),projectName);
    fs.ensureDirSync(dir);
    let tempDir = utils.getCwd(`template/${tempName}`)
    let author = gitUser();
    if(!utils.isEmptyDir(dir)){
        logger.fatal(`/${projectName}/不是空文件夹`)
    }else{
        inquire.prompt([
            {
                name:"name",
                message:"请输入项目名",
                default:projectName
            },
            {
                name:"description",
                message:"请输入项目描述",
                default:'我的项目'
            },
            {
                name:"author",
                message:"请输入作者",
                default:author
            }
        ]).then((answers)=>{
            try {
                let tempJson = fs.readJSONSync(path.join(tempDir,"package.json"))
                tempJson.name = answers.name;
                tempJson.description = answers.description;
                tempJson.author = author;
                fs.writeJsonSync(path.join(dir,"package.json"), tempJson,{spaces:'\t'});
                let isPack = /.+package\.json$/;
                fs.copySync(tempDir, dir,(src)=>{
                    return !isPack.test(src);
                })
                logger.success("项目创建成功");
                exec(`cd ${projectName}`);
            } catch (error) {
                console.log(error)
            }
        })
    }
}
