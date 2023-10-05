import React from "react";
import ItemNote from "./ItemNote.js";
import propTypes from "prop-types";
import { showFormattedDate } from "../../utils/index.js";

export default function ListNote({ notes }) {
  return (
    <>
      <div className="notes-list">
        {notes.map((note) => (
          <ItemNote
            key={note.id}
            title={note.title}
            body={note.body}
            createdAt={showFormattedDate(note.createdAt)}
            id={note.id}
          />
        ))}
      </div>
    </>
  );
}

ListNote.propTypes = {
  notes: propTypes.arrayOf(propTypes.object).isRequired,
};
