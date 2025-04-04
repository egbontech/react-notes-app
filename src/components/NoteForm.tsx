import React from "react";

interface NoteFormProps {
  noteText: string;
  setNoteText: (text: string) => void;
  addNote: () => void;
  setCharacterCount: (characterCount: number) => void;
  characterCount: number
}

export default function NoteForm({
  noteText,
  setNoteText,
  addNote,
  setCharacterCount,
  characterCount
}: NoteFormProps) {
  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const text = e.target.value;

    if (text.length <= 100) {
      setCharacterCount(text.length);
      setNoteText(text);
    }
  };
  return (
    <div className="bg-blue-200 h-40 shadow-lg rounded-lg p-4 flex flex-col justify-between">
      <input
        type="text"
        className="placeholder-gray-500 outline-none"
        placeholder="Add Note..."
        value={noteText}
        onChange={handleInput}
      />

      <div className="flex justify-between">
        <p className="text-sm">{100 - characterCount} Remaining</p>
        <button
          className="px-3 py-0.5 bg-blue-500 rounded-full cursor-pointer text-sm text-white"
          onClick={() => addNote()}
        >
          Save
        </button>
      </div>
    </div>
  );
}
