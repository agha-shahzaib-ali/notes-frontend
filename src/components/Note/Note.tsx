import INote from "../../interfaces/note.interface";
import "./Note.css";
import { FC, FocusEvent, useState } from "react";

type Prop = {
  note: INote;
  onNoteUpdate: (note: INote) => void;
  onNoteDelete: (note: INote) => void;
};


// const onTextInputFocus=()=>{
//   console.log('input focussed');
// };
// const onTextInputBlur=()=>{
//   console.log('input blurred');
// };

//Its a presentational (Dumb) Component
const Note: FC<Prop> = ({ note, onNoteUpdate, onNoteDelete }) => {
  const [isFocussed, setIsFocussed] = useState(false);
  const noteTextUpdated = (event: FocusEvent<HTMLDivElement>) => {
    setIsFocussed(false);
    
    const newTextValue = event.currentTarget.textContent;
    if (newTextValue === note.text){
      return;
    }
    console.log('note text changed');
    //These lines of code are not executed if text is not updated by the user.
    const updatedNoteObject: INote = {
      ...note,
      // link: note.link,
      text: newTextValue || "",
    };
    console.log(newTextValue);
    onNoteUpdate(updatedNoteObject);
  };
  // console.log(`Value of isFocussed is ${isFocussed}, note text is ${note.text}`);
  return (
    <div className={isFocussed? "note note--focussed": "note"}>
      <button
      onClick={()=>{
        onNoteDelete(note);
      }}
       type="button" 
       className="btn-close" 
       aria-label="Close">
       </button>
      <div 
      // onFocus={onTextInputFocus}
      // onInput={noteTextUpdated}
      onBlur={noteTextUpdated}
      onFocus={()=>{
        setIsFocussed(true);
      }}
      contentEditable={true} 
      suppressContentEditableWarning={true} 
      className="note__text"
      >
        {note?.text}
      </div>

      <div className="note__link">
        <a href={note?.link}>{note?.link}</a>
      </div>

    </div>
  );
};

export default Note;
