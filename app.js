// video1
// const fs=require('fs')
// fs.writeFileSync('notes.txt','THIS WAS CREATED BY NODE.JS  hello')
// // fs.writeFileSync('notes.txt','THIS FILE WAS CREATED BY NODE.JS  hello')
// fs.appendFileSync('notes.txt',"\nThis was appended")


// require('./utils.js')
// const name="medini"

// const n=require('./utils.js')

// const s=n(400,-2)
// // console.log(n)
// console.log(s)

// const n=require('./notes.js')
// const m=n()
// console.log(m)

// const v=require('validator')
import validator from 'validator'
// import v from validator
import chalk from 'chalk'
// const getNotes=require('./notes.js')
// import getNotes from './notes.js';
import notes from './notes.js';

// import yargs from 'yargs';
// import { hideBin } from 'yargs/helpers'
// const yargs=require('yargs')
// import yargs from 'https://deno.land/x/yargs/deno.ts'
// import { Arguments } from 'https://deno.land/x/yargs/deno-types.ts'

// const m=getNotes()
// console.log(m)

// console.log(validator.isEmail("medu0604@gmail.com"))
// console.log(validator.isEmail("medu0604gmail.com"))
// console.log(validator.isURL("https://mern.com"))
// console.log(validator.isURL("https:/mern.com"))

// console.log(chalk.green('SUCCESS!'))
// console.log(chalk.green.bold('SUCCESS!'))
// console.log(chalk.green.bold.inverse('SUCCESS!'))
// console.log(chalk.red.bold.inverse('ERROR!!!!'))

// console.log(process.argv[2])

// const command=process.argv[2]

// if(command==='add'){
//     console.log("Adding a note")
// }else if(command==='remove'){
//     console.log("Removing note")
// }

// console.log(process.argv)
// console.log(yargs.argv)

import yargs from 'yargs'

const y = yargs()
y.version('1.1.0')
//create add command
y.command({
    command: 'add',
    describe: 'Add a new note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            // because it requires an argument compulsorily
            type: 'string'
            //i.e title should always be string if not convert it to string
        },

        body: {
            describe: 'Note body',
            demandOption: true,
            type: 'string'
        }
    },
    // handler: function (argv) {
    handler(argv) {
        // console.log('Adding a new note',argv)
        // console.log('Title : '+argv.title)
        // console.log('Body : '+argv.body)

        notes.addNotes(argv.title, argv.body)
    }
})

// to RUN THE ADD COMMAND
// node app.js add --title='Shopping list' --body="veggies" 


// -------------------------------------------------------------------------
//remove command
y.command({
    command: 'remove',
    describe: 'Remove a  note',
    builder: {
        title: {
            describe: 'Note title',
            demandOption: true,
            type: 'string'
        }
    },
    // handler: function (argv) {
    handler(argv) {
        // console.log('Removing a new note')
        notes.removeNotes(argv.title)
    }
})

// to RUN THE remove COMMAND
// node app.js remove --title='Shopping list'
// -----------------------------------------------------------------------------------------------


//list command
y.command({
    command: 'list',
    describe: 'Listing all notes',
    handler () {
        notes.listNotes()
    }
})
// node app.js read
//--------------------------------------------------------------------------------------

//read command
y.command({
    command: 'read',
    describe: 'Read a note',
    builder:{
        title:{
            describe:"Note title",
            demandOption:true,
            type:'string'
        }
    },
    handler (argv) {
        notes.readNote(argv.title)
    }
})

// to run this node app.js read --title="shopping"
// ----------------------------------------------------------------------------------------
y.parse(process.argv.slice(2))
// console.log(y.argv)
