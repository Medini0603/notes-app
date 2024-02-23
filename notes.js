// const fs=require('fs')
import fs from 'fs';
import chalk from 'chalk';

const getNotes =  ()=> {
    return "Your notes..."
}

const addNotes =  (title, body)=> {
    const notes = loadNotes()

    // A function that accepts up to three arguments. 
    // The filter method calls the predicate function one time for each element in the array.
    // Returns the elements of an array that meet the condition specified in a callback function.
    //filter function

    // const duplicateNotes = notes.filter(function (note) {
    //     return note.title === title

    //using an arrow function
    const duplicateNotes = notes.find( (note) =>{
        return note.title === title
        //to check if notes has duplocate title i.e same title but 2 notes
    })
    // debugger
    if (!duplicateNotes) {
        // push function to add element to array
        notes.push({
            title: title,
            body: body
        })

        savedNotes(notes)
        console.log(chalk.green.inverse("New note added!"))
    }

    else {
        console.log(chalk.red.inverse("Note title taken!"))
    }
}

//to write array into json file
const savedNotes =  (notes)=> {
    const dataJson = JSON.stringify(notes)
    fs.writeFileSync('notes.json', dataJson)
}

// to get contents of json file i.e existing notes
const loadNotes =  () =>{
    // try - catch to handle the case when notes.json is not yet created 
    try {
        const databuffer = fs.readFileSync('notes.json')
        const dataJson = databuffer.toString()
        return JSON.parse(dataJson)
    } catch (e) {
        return []
    }

}

const removeNotes =  (title)=> {

    const notes = loadNotes()
    const notestokeep = notes.filter( (note)=> note.title !== title
    )// observe that we havent used return statement as in add notes but it still works the same

    if (notes.length > notestokeep.length) {
        console.log(chalk.green.inverse("Removing notes"))
        savedNotes(notestokeep)
    }
    else {
        console.log(chalk.red.inverse("Note not found"))
    }

}


const listNotes=()=>{
    const mynotes=loadNotes()
    console.log(chalk.bgCyan.inverse("Your notes"))
    mynotes.forEach(n => {
        console.log(n.title)
    });
}


const readNote=(title)=>{
    const notes=loadNotes()
    const reqnote=notes.find((note)=>note.title===title)

    if(reqnote){
        console.log(chalk.bgBlue.inverse("Note found "+title))
        console.log(reqnote.body)
    }
    else{
        console.log(chalk.red.inverse("Note not found "+title))

    }
}
// module.exports=getNotes
export default {
    getNotes: getNotes,
    addNotes: addNotes,
    removeNotes: removeNotes,
    listNotes:listNotes,
    readNote:readNote
}