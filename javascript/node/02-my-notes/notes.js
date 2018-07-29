const fs = require('fs');

module.exports = function (opt) {

    // optional params
    opt = opt || {}

    // private data
    let foo = opt.foo || 'default';

    let addnote = (title, body) => {

        let notes = fetchNotes();
        let note = {
            title,
            body
        };

        // var duplicateNotes = notes.filter((note) => {
        //     return note.title === title;
        // });

        var duplicateNotes = notes.filter(note => note.title === title);

        if (duplicateNotes.length === 0) {
            notes.push(note);
            saveNotes(notes);
            return note;
        }

    };

    let getAll = () => {
        console.log('Getting all notes');
        return fetchNotes();
    }

    let getNote = (title) => {
        console.log('Getting note', title);
        let notes = fetchNotes();
        let filteredNotes = notes.filter((note) => note.title === title);
        return filteredNotes[0];
    }

    let removeNote = (title) => {
        console.log('Remove note', title);
        let notes = fetchNotes();
        let filteredNotes = notes.filter((note) => note.title !== title);
        saveNotes(filteredNotes);
        return notes.length !== filteredNotes.length;
    }

    let logNote = (note) => {
        console.log('---');
        console.log(`Note: ${note.title}`);
        console.log(`Body: ${note.body}`);
    }

    // API/data for end-user
    return {
        addnote: addnote,
        getAll: getAll,
        getNote: getNote,
        removeNote: removeNote,
        logNote: logNote
        //...
    }

    // private functions
    function fetchNotes() {
        try {
            let notesString = fs.readFileSync('note-data.json');
            return JSON.parse(notesString);
        } catch (e) {
            return [];
        }
    };

    function saveNotes(notes) {
        fs.writeFileSync('note-data.json', JSON.stringify(notes));
    };

}