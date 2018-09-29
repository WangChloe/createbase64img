#!/usr/bin/env node
// const program = require('commander');
const createbase64img = require('./src/main');
// const package = require('./package');

// program.version(package.version)
//     .usage('<command>')
//     // .option('-s, --sass','output sass file')
//     // .option('-p, --padding [number]', 'output sprite icon padding spacing')
//     // .option('-j, --json','output json file');

// program
//     .command('createbase64img')
//     // .description('create pc or mibile sprite image and styles')
//     .action(function(){
        // let params = {
        //     'type' : type == 'pc' ? 1 : 2,
        //     'sass' : program.sass ? true : false,
        //     'json' : program.json ? true : false,
        //     'padding' : program.padding && !isNaN(Number(program.padding)) ? Number(program.padding) : 5,
        //     'algorithm' : options ? options : 'top-down'
        // };
        //console.log(params);
        createbase64img();
//     });


// program.on('--help',function(){
//     console.log('');
//     console.log('  Example: ');
//     console.log('');
//     console.log('  $ createbase64img');
//     console.log('');
// });


// program.parse(process.argv);
// if(!program.args.length){
//     program.help();
// }
