import INote from "../../interfaces/note.interface";
import "./Note.css";
import { FC, FocusEvent } from "react";

type Prop = {
  note: INote;
  onNoteUpdate: (note: INote) => void;
};


// const onTextInputFocus=()=>{
//   console.log('input focussed');
// };
// const onTextInputBlur=()=>{
//   console.log('input blurred');
// };

//Its a presentational (Dumb) Component
const Note: FC<Prop> = ({ note, onNoteUpdate }) => {

  const noteTextUpdated = (event: FocusEvent<HTMLDivElement>) => {
    console.log('note text changed');
    const newTextValue = event.currentTarget.textContent;
    if (newTextValue === note.text){
      return;
    }

    //These lines of code are not executed if text is not updated by the user.
    const updatedNoteObject: INote = {
      ...note,
      // link: note.link,
      text: newTextValue || "",
    };
    console.log(newTextValue);
    onNoteUpdate(updatedNoteObject);
  };

  return (
    <div className="note">

      <div 
      // onFocus={onTextInputFocus}
      // onInput={noteTextUpdated}
      onBlur={noteTextUpdated}
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
