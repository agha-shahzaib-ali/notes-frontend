import axios from "axios";
import { API_URL } from "../constants/api";
import INote from "../interfaces/note.interface";

// All CRUD API Calls to the Backend Are made from here;
// Isn't that kinda Cool

//getNotes Method
export const getNotes= async () =>{
    try {
     const response = await axios.get(API_URL);
     return response.data.notes; 
     } catch(err){
        console.error(err);
     }     
}

//createNote Method
export const createNote= async (newNote: Partial<INote>) =>{
    try {
     const response = await axios.post(API_URL, newNote);
     return response.data.note; 
     } catch(err){
        console.error(err);
     }     
}

//deleteNote Method
export const deleteNote= async (noteToDeleteId: string) =>{
   try {
    const url =`${API_URL}/${noteToDeleteId}`;
    const response = await axios.delete(url);
    return response.data.deletedNote; 
    } catch(err){
       console.error(err);
    }     
}

//updateNote Method
export const updateNote= async (noteToUpdate: INote) =>{
   try {
      const url =`${API_URL}/${noteToUpdate._id}`;
      const response = await axios.put(url, noteToUpdate);
      return response.data.note;
    } catch(err){
       console.error(err);
    }     
}