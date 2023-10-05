import React from "react";
import propTypes from "prop-types";
import { IoArchiveSharp, IoShareSharp, IoTrashBinSharp } from "react-icons/io5";

export default function Button({ Index, Active, Archive, Delete, id }) {
  return (
    <>
      {Index.archived ? (
        <button className="action" type="button" onClick={() => Active(id)}>
          <IoShareSharp />
        </button>
      ) : (
        <button className="action" type="button" onClick={() => Archive(id)}>
          <IoArchiveSharp />
        </button>
      )}
      <button className="action" type="button" onClick={() => Delete(id)}>
        <IoTrashBinSharp />
      </button>
    </>
  );
}

Button.propTypes = {
  Index: propTypes.object.isRequired,
  Active: propTypes.func.isRequired,
  Archive: propTypes.func.isRequired,
  Delete: propTypes.func.isRequired,
  id: propTypes.string.isRequired,
};
