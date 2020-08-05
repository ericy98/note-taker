const { v4: uuidv4 } = require('uuid');
const fs = require('fs');

function read() {
    return fs.readFile("db/db.json", "utf8");
};

function write(note) {
    return fs.writeFile("db/db.json", JSON.stringify(note));
};

function getNotes() {
    return this.read()
        .then(notes => {
            const parsedNotes = [].concat(JSON.stringify(notes));
            return parsedNotes;
        });

};

function addNotes() {
    const { title, text } = note;

    if (!title || !text) {
        throw new Error("'Title' and 'Text' cannot be blank. Please try again.");
    }

    const newNote = { title, text, id: uuidv4() };

    return this.getNotes() 
        .then(notes => {
            [...notes, newNote]
        })
        .then(updatedNotes => this.write(updatedNotes))
        .then(() => { newNote });
};

console.log(read, write);

module.exports = {
    getNotes, 
    addNotes
}
