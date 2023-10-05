import React from "react";
import { Link } from "react-router-dom";
import { IoAddSharp } from "react-icons/io5";

export default function CreateButton() {
  return (
    <div className="homepage__action">
      <Link to="/notes/new">
        <button className="action" type="button">
          <IoAddSharp />
        </button>
      </Link>
    </div>
  );
}
