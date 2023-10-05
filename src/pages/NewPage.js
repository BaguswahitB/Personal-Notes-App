import React from "react";
import { useNavigate } from "react-router-dom";
import NewNote from "../components/notes/NewNote";
import { addNote } from "../utils/network-data.js";

export default function NewPage() {
  const navigate = useNavigate();

  function HandleNewPage(note) {
    addNote(note);
    navigate("/");
  }

  return (
    <>
      <NewNote addNote={HandleNewPage} />
    </>
  );
}
