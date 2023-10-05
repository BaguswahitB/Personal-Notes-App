import React from "react";
import propTypes from "prop-types";
import { LocaleConsumer } from "../../contexts/LocaleContext";

export default function SearchNote({ status, searchTitle, onSearchChange }) {
  return (
    <LocaleConsumer>
      {({ locale }) => {
        return (
          <>
            {locale === "id" ? (
              <h2>Catatan {status ? "Aktif" : "Arsip"}</h2>
            ) : (
              <h2> {status ? "Actives" : "Archives"} Notes</h2>
            )}
            <div className="search-bar">
              <input
                type="text"
                placeholder={
                  locale === "id"
                    ? "Cari berdasarkan judul....."
                    : "Search by title....."
                }
                value={searchTitle}
                onChange={(event) => onSearchChange(event)}
              />
            </div>
          </>
        );
      }}
    </LocaleConsumer>
  );
}

SearchNote.propTypes = {
  status: propTypes.bool.isRequired,
  searchTitle: propTypes.string.isRequired,
  onSearchChange: propTypes.func.isRequired,
};
