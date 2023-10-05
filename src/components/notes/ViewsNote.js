import React from "react";
import propTypes from "prop-types";
import Button from "../index/Button.js";
import { showFormattedDate } from "../../utils/index.js";

export default function ViewsNote({
  Index,
  Active,
  Archive,
  Delete,
  id,
  title,
  body,
  createdAt,
}) {
  return (
    <>
      <main>
        <div className="detail-page">
          <h3 className="detail-page__title">{title}</h3>
          <p className="detail-page__createdAt">
            {showFormattedDate(createdAt)}
          </p>
          <div className="detail-page__body">{body}</div>
          <div className="detail-page__action">
            <Button
              id={id}
              Index={Index}
              Delete={Delete}
              Archive={Archive}
              Active={Active}
            />
          </div>
        </div>
      </main>
    </>
  );
}

ViewsNote.propTypes = {
  Index: propTypes.object.isRequired,
  Active: propTypes.func.isRequired,
  Archive: propTypes.func.isRequired,
  Delete: propTypes.func.isRequired,
  id: propTypes.string.isRequired,
  title: propTypes.string.isRequired,
  body: propTypes.string.isRequired,
  createdAt: propTypes.string.isRequired,
};
