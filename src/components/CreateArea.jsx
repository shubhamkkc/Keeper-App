import React, { useState} from "react";
import { Fab } from '@material-ui/core';
import { Zoom } from '@material-ui/core';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import axios from "axios";


function CreateArea(props) {
  const [checked, setChecked] = React.useState(false);
  const [note, setNote] = useState([]);
 

  function handleChange(event) {
    
    const { name, value } = event.target;

    setNote(prevNote => {
      return {
        ...prevNote,
        [name]: value
      };
    });
  }

  function submitNote(event) {
    addNote(note)
    
    props.onAdd(note);
    setNote({
      title: "",
      content: ""
    });
    event.preventDefault();
  }
function handleZoom(){
 
  setChecked(true);
}
function addNote(newNote) {
  
  axios.post("/api/keeper/add", newNote)
  
  
}
  return (
    <div>
      <form className="create-note">
       {checked ?  <input
          name="title"
          
          onChange={handleChange}
          value={note.title}
          placeholder="Title"
          
        /> : null }
       

        <textarea
          name="content"
          onClick={handleZoom}
          onChange={handleChange}
          value={note.content}
          placeholder="Take a note..."
         rows={checked ? 3 :1}
        />
       

       
       <Zoom in={checked}> 
       <Fab onClick={submitNote}
         ><AddCircleOutlineIcon /></Fab> 
       </Zoom>
      </form>
    </div>
  );
}

export default CreateArea;
