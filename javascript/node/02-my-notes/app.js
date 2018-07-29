const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes')({
    foo: 'hello world!'
});

const titleOptions = {
    describe: 'Title of note',
    demand: true,   // requerido
    alias: 't'  // node app.js add --title="my title" --body="body" => node app.js add -t="my title" -b="body"
};

const bodyOptions = {
    describe: 'Body of note',
    demand: true,   // requerido
    alias: 'b'
}


const argv = yargs
    .command('add','Add a new note',{
        title: titleOptions,
        body: bodyOptions
    })
    .command('list','list all notes')
    .command('read','Read a note', {
        title: titleOptions,
    })
    .command('remove','Remove note', {
        title: titleOptions,
    })
    .help() // node app.js --help
    .argv;


const command = argv._[0];

// node app.js add --title="to buy" --body ""
// node app.js list
// node app.js read --title=secrets
// node app.js remove --title=panchito


if (command === 'add') {
    console.log('Adding new note ');
    let note = notes.addnote(argv.title, argv.body);
    if (note) {
        console.log('Note created');
        notes.logNote(note);
    } else {
        console.log('Note title taken');
    }
} else if (command === 'list') {
    let allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s)`);
    allNotes.forEach(note => {
        notes.logNote(note);
    });
} else if (command === 'read') {
    let note = notes.getNote(argv.title);
    if (note) {
        console.log('Note found');
        notes.logNote(note);
    } else {
        console.log('Note not found');
    }
} else if (command === 'remove') {
    let noteRemoved = notes.removeNote(argv.title);
    let message = noteRemoved ? 'Note was removed' : 'Note not found';
    console.log(message);
} else {
    console.log('Command not recognized');
}