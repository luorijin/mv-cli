const path = require("path");
const fs = require("fs-extra")
module.exports = {
    getCwd:(url)=>{
        return path.join(__dirname,"../",url)
    },
    isEmptyDir:(dir)=>{
        let files = fs.readdirSync(dir)
        return !files.length;
    }
}