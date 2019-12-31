const request = require('request')
const semver = require('semver')
const chalk = require('chalk')
const tempMap = require('../template/map.json')
module.exports = (repos,done) => {
    let url = `https://raw.githubusercontent.com/luorijin/${repos}/master/package.json`;
    request({
        url,
        timeout: 6000
    }, (err, res, body) => {
        if (!err && res.statusCode === 200) {
            const latestVersion = JSON.parse(body).version;
            const localVersion = tempMap[repos]
            if (semver.lt(localVersion, latestVersion)) {
                console.log(chalk.yellow(`  A newer version of ${repos} is available.`))
                console.log()
                console.log('  latest:    ' + chalk.green(latestVersion))
                console.log('  installed: ' + chalk.red(localVersion))
                console.log()
                done(false)
            }else{
                done(true)
            }
        }else{
            console.warn(chalk.red("检查版本出错,已经跳过"))
            done(true)
        }
       
    })
}