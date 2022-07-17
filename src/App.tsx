import React from "react";
// import axios from 'axios';
import { useEffect, useState } from "react";
import "./App.css";
import DUMMY_NOTES from "./DUMMY_NOTES";
import Note from "./components/Note/Note";
import INote from "./interfaces/note.interface";

function App() {
  const [notesList, setNotesList] = useState<Array<INote>>([]);
  // setNotesList(DUMMY_NOTES);
  //useState(()=>{     }, [Array of Dependencies which is kept empty to start the proceedings]), has to 2 Use Cases:
  //1. When state variable initializes
  //2. When State variable updates
  //Otherwise, its never triggered.


  //App Component renders the first time;
  useEffect(() => {
    
    const listFromStorageString = localStorage.getItem('my-notes');
    if(listFromStorageString){
      console.log(listFromStorageString);
      const listFromStorageArray = JSON.parse(listFromStorageString);
      setNotesList(listFromStorageArray);
    }
    else
    {
      setNotesList(DUMMY_NOTES);
    }
    // setNotesList(DUMMY_NOTES);
    
  }, []);

  useEffect(() => {

    if(notesList.length != 0){
    console.log('Saving to local Storage');
    // console.log(notesList);
    const notesListString = JSON.stringify(notesList);
    localStorage.setItem('my-notes', notesListString);
  }
    else{
    console.log('Nothing saved to Local Storage');
  }
    
    
  }, [notesList]);
  
    /*
   //getNotes Method
   const getNotes= async () =>{
        try {
         const response = await axios.get("http://localhost:5000/notes");
          
           setNotesList(response.data.notes);
    
           console.log(notesList[0].text);
           console.log(notesList[0].link);    
           console.dir(`notesList is....... ${notesList[0].text} `);   
         }
         catch(err){
           console.error(err);
         }     
   }

*/
  

   
   console.log('rerendering');
   console.log('notesList is as Follows');
   console.log(notesList);
  const updateNoteItem =(updatedNote: INote)=>{
      console.log('Value has been updated in the App component');
      console.log(updatedNote);

      //Temporary Variable
      const updatedList = notesList.map((noteItem)=>{
        if(noteItem._id === updatedNote._id){
          return updatedNote;
        }else{
          return noteItem;
        }
        // console.log(noteItem);
      });
      console.log('updatedList value');
      // console.log(updatedList);
      setNotesList(updatedList); //Updating the state
  };
  return (

    <div className="App">
      <div className="notes_list">
        {notesList.map((noteItem, index) => {
          return <Note note={noteItem} onNoteUpdate={updateNoteItem} key={index} />;
        })}
      </div>
    </div>
  );
}

export default App;
