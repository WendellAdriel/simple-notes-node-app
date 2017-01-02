const fs = require('fs');
const _ = require('lodash');
const yargs = require('yargs');

const notes = require('./notes');
const options = require('./options');

const argv = yargs
  .command('add', 'Add a new note', {
    title: options.titleOptions,
    body: options.bodyOptions
  })
  .command('list', 'List all notes')
  .command('read', 'Read a note', {
    title: options.titleOptions
  })
  .command('remove', 'Remove a note', {
    title: options.titleOptions
  })
  .help()
  .argv;

const command = argv._[0];
let note;

switch (command) {
  case 'add':
    note = notes.addNote(argv.title, argv.body);
    if (note) {
      console.log('Note created');
      notes.logNote(note);
      break;
    }
    console.log('Note title taken');
    break;
  case 'list':
    const allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} note(s)`);
    allNotes.forEach(note => notes.logNote(note));
    break;
  case 'read':
    note = notes.getNote(argv.title);
    if (note) {
      console.log('Note found');
      notes.logNote(note);
      break;
    }
    console.log('Note not found');
    break;
  case 'remove':
    const noteRemoved = notes.removeNote(argv.title);
    const message = noteRemoved ? 'Note was removed' : 'Note not found';
    console.log(message);
    break;
}
