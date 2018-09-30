#!/usr/bin/env node
const program = require('commander');
const createbase64img = require('./src/main');
const package = require('./package');

program.version(package.version)
    .usage('<command>')

program
    .command('base64')
    .description('convert img to base64 code')
    .action(function(){
        createbase64img();
    });

program.on('--help',function(){
    console.log('');
    console.log('  Example: ');
    console.log('');
    console.log('  $ create base64');
    console.log('');
});


program.parse(process.argv);
if(!program.args.length){
    program.help();
}
