#!/usr/bin/env node

const program = require("commander")
const package = require("../package.json");

program.version(package.version)
        .name('mv').usage('<command> [项目名称]')
        .command('init', '初始化项目')
        .command('g', '自动生成项目文件')
        .parse(process.argv);