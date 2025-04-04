import { useEffect, useRef, useState } from "react";
import SearchBar from "./SearchBar";
import Note from "./Note";
import NoteForm from "./NoteForm";

interface NoteInterface {
  id: number;
  text: string;
  date: string;
}

export default function NotesContainer() {
  const [notes, setNotes] = useState<NoteInterface[]>([]);
  const [noteText, setNoteText] = useState<string>("");
  const [characterCount, setCharacterCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredNotes, setFilteredNotes] = useState<NoteInterface[]>([]);
  const isFirstRender = useRef(true);

  const addNote = () => {
    if (noteText.trim() === "") return; // help prevents users from adding empty notes

    const newNote = {
      id: Date.now(),
      text: noteText,
      date: new Date().toLocaleDateString(),
    };

    setNotes((prevNotes) => [...prevNotes, newNote]);
    setNoteText("");
    setCharacterCount(0);
  };

  const deleteNote = (id: number) => {
    const newNotes = notes.filter((note) => note.id !== id);
    setNotes(newNotes);
  };

  const searchNotes = (
    notes: NoteInterface[],
    query: string
  ): NoteInterface[] => {
    if (query.trim() === "") {
      return notes;
    }

    const filteredNotes = notes.filter((note) =>
      note.text.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return filteredNotes;
  };

  //this would run when we type in the search bar
  useEffect(() => {
    const result = searchNotes(notes, searchQuery);
    setFilteredNotes(result);
  }, [notes, searchQuery]);

  //would run once when we open the application
  useEffect(() => {
    const savedNotes = localStorage.getItem("notes");
    if (savedNotes) {
      setNotes(JSON.parse(savedNotes));
    }
  }, []);

  // would run anytime the notes array changes
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return; //the code will stop executing here
    }
    localStorage.setItem("notes", JSON.stringify(notes));
  }, [notes]);

  return (
    <div className="md:w-[80%] w-[100%] mx-auto p-8 ">
      <h1 className="font-bold text-3xl mb-6 text-white">Notes App</h1>
      <SearchBar searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="my-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredNotes.map((note) => {
          return <Note note={note} key={note.id} deleteNote={deleteNote} />;
        })}
        <NoteForm
          noteText={noteText}
          setNoteText={setNoteText}
          addNote={addNote}
          setCharacterCount={setCharacterCount}
          characterCount={characterCount}
        />
      </div>
    </div>
  );
}
