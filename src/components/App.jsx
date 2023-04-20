import React, { useState, useEffect } from 'react';
import Header from './Header';
import Footer from './Footer';
import Note from './Note';
import CreateArea from './CreateArea';
import axios from 'axios';
function App() {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    axios
      .get('/api/keeper')
      .then((res) => {
        setNotes(res.data);
        console.log(res.data);
      })
      .catch((err) => console.error(err));
    //  console.log("axios")
  }, []);
  console.log('useefectcall', notes);

  function addNote(newNote) {
    setNotes((prevNotes) => {
      return [...prevNotes, newNote];
    });
  }

  function deleteNote(id, itemId) {
    setNotes((prevNotes) => {
      return prevNotes.filter((noteItem, index) => {
        return index !== id;
      });
    });
    axios
      .post(`/api/keeper/delete/`, { id: itemId })
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  }

  return (
    <div>
      <Header />
      <CreateArea onAdd={addNote} />
      {notes.map((noteItem, index) => {
        return (
          <Note
            key={index}
            id={index}
            itemId={noteItem._id}
            title={noteItem.title}
            content={noteItem.content}
            onDelete={deleteNote}
          />
        );
      })}
      <Footer />
    </div>
  );
}

export default App;
