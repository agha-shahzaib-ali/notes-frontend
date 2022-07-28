import React from "react";
// import axios from 'axios';
import { useEffect, useState } from "react";
import "./App.css";
// import DUMMY_NOTES from "./DUMMY_NOTES";
import Note from "./components/Note/Note";
import INote from "./interfaces/note.interface";
//CRUD Operations Imported from noteService.ts
import { createNote, getNotes, updateNote, deleteNote } from "./services/notesService";
import {Modal, Button, FloatingLabel, Form} from 'react-bootstrap';
//Main Function under which everything is rendered;
function App() {
  const [notesList, setNotesList] = useState<Array<INote>>([]);
  const [show, setShow] = useState(false);
  const [newNote, setNewNote] = useState<Partial<INote>>({
    link:"",
    text:""
  });

  const handleClose = () => {
    setNewNote({
      link:"",
      text:""
    });
    setShow(false);
  }
  const handleShow = () => setShow(true);
  // setNotesList(DUMMY_NOTES);
  //useState(()=>{     }, [Array of Dependencies which is kept empty to start the proceedings]), has to 2 Use Cases:
  //1. When state variable initializes
  //2. When State variable updates
  //Otherwise, its never triggered.


  //App Component renders the first time;
  useEffect(() => {
    
    // const listFromStorageString = localStorage.getItem('my-notes');
    // if(listFromStorageString){
    //   console.log(listFromStorageString);
    //   const listFromStorageArray = JSON.parse(listFromStorageString);
    //   setNotesList(listFromStorageArray);
    // }
    // else
    // {
    //   setNotesList(DUMMY_NOTES);
    // }
   getNotesFromServer();

  }, []);

  const getNotesFromServer= async () =>{
        const notes = await getNotes();
        setNotesList(notes);
  }


  // useEffect(() => {

  //   if(notesList.length != 0){
  //   console.log('Saving to local Storage');
  //   // console.log(notesList);
  //   const notesListString = JSON.stringify(notesList);
  //   localStorage.setItem('my-notes', notesListString);
  // }
  //   else{
  //   console.log('Nothing saved to Local Storage');
  // }
    
  // }, [notesList]);

  //  console.log('rerendering');
  //  console.log('notesList is as Follows');
  //  console.log(notesList);
  const updateNoteItem = async (updatedNote: INote)=>{
      console.log('Value has been updated in the App component');
      // console.log(updatedNote);
     const noteFromServer =  await updateNote(updatedNote);
      //Temporary Variable
      const updatedList = notesList.map((noteItem)=>{
        if(noteItem._id === noteFromServer._id){
          return noteFromServer;
        }else{
          return noteItem;
        }
        // console.log(noteItem);
      });
      console.log('updatedList value');
      console.log(updatedList);
      setNotesList(updatedList); //Updating the state
  };

  const deleteNoteItem = async (noteToDelete: INote) =>{
    // console.log('Note to delete in the Parent ', noteToDelete);
    const deletedNote = await deleteNote(noteToDelete._id);
    console.log(deletedNote);
    const remainingNotes = notesList.filter((noteItem)=>{

      return (noteItem._id !== noteToDelete._id)
    });
    setNotesList(remainingNotes);
  }
  const addNote = async ()=>{
    const savedNote = await createNote(newNote);
    setNotesList([...notesList, savedNote]);
    console.log(savedNote);
    handleClose();
  }
  return (

    <div className="App">
            <Button 
            className="add-button"
            variant="dark" 
            onClick={handleShow}>
                +
            </Button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Note</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <FloatingLabel controlId='floatingTextarea2' label='Text'>
          <Form.Control
          onChange={(event)=>{
           const newVal = event.currentTarget.value;
           setNewNote({
            ...newNote,
            text: newVal,
           })
          }}
          as="textarea"
          placeholder="Enter your note text"
          style={{height : "auto"}}
          />
        </FloatingLabel>

        <FloatingLabel controlId='floatingTextarea' 
        label='Link'
        className='mb-3 note-link'
        >
          <Form.Control
          onChange={(event)=>{
            const newVal = event.currentTarget.value;
            setNewNote({
            ...newNote,
            link: newVal,
            })
           }}
          type="url"
          placeholder="Enter your note link"
          />
        </FloatingLabel>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={addNote}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>

      <div className="notes_list">
        {notesList.map((noteItem, index) => {
        return <Note 
        note={noteItem} 
        onNoteUpdate={updateNoteItem}
        onNoteDelete={deleteNoteItem} 
        key={index} />;
        })}
      </div>
    </div>
  );
}

export default App;
