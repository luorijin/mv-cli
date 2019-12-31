const program = require('commander')
const tempMap = require('../template/map.json')
const checkVersion = require('../lib/check-version')
const generate = require('../lib/generate')
const download = require("../lib/download")

program.parse(process.argv);
let tempName = program.args[0];
let projectName = program.args[1];
if(tempMap[tempName]){
    checkVersion(tempName,(is)=>{
        if(is){
            generate(tempName,projectName)
        }else{
            download(tempName,()=>{
                generate(tempName,projectName)
            });
        }
    })
}else{
    download(tempName,()=>{
        generate(tempName,projectName)
    });
}