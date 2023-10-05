import React from "react";
import { Link } from "react-router-dom";
import propTypes from "prop-types";

export default function ItemNote({ title, body, id, createdAt }) {
  return (
    <div className="note-item">
      <h3 className="note-item__title">
        <Link to={`/notes/${id}`}>{title}</Link>
      </h3>
      <p className="note-item__createdAt">{createdAt}</p>
      <p className="note-item__body">{body}</p>
    </div>
  );
}

ItemNote.propTypes = {
  title: propTypes.string.isRequired,
  body: propTypes.string.isRequired,
  id: propTypes.string.isRequired,
  createdAt: propTypes.string.isRequired,
};
