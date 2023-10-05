import React from "react";
import SearchNote from "../components/notes/SearchNote.js";
import ListNote from "../components/notes/ListNote.js";
import propTypes from "prop-types";
import { getArchivedNotes } from "../utils/network-data.js";
import { useSearchParams } from "react-router-dom";
import { LocaleConsumer } from "../contexts/LocaleContext.js";

export default function ArchivePages() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTitle = searchParams.get("searchTitle");
  function HandleSearchParams(searchTitle) {
    setSearchParams({ searchTitle });
  }

  return (
    <ArchivePage keyword={searchTitle} onSearchChange={HandleSearchParams} />
  );
}

class ArchivePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      searchTitle: props.keyword || "",
    };
    this.SearchNote = this.SearchNote.bind(this);
  }

  SearchNote(event) {
    this.setState((prevState) => {
      return {
        ...prevState,
        searchTitle: event.target.value,
      };
    });
    this.props.onSearchChange(event.target.value);
  }

  async componentDidMount() {
    this.setState(() => {
      return {
        notes: null,
      };
    });
  }

  async componentDidUpdate() {
    const { data } = await getArchivedNotes();
    this.setState(() => {
      return {
        notes: data,
      };
    });
  }

  render() {
    if (this.state.notes === null) {
      return (
        <div className="notes-list-empty">
          <p className="notes-list__empty">Memuat Catatan.....</p>
        </div>
      );
    }
    const view = false;
    const resultSearch = this.state.notes.filter((note) => {
      return note.title
        .toLowerCase()
        .includes(this.state.searchTitle.toLowerCase());
    });

    return (
      <LocaleConsumer>
        {({ locale }) => {
          return (
            <>
              <main>
                <div className="homepage">
                  <SearchNote
                    status={view}
                    searchTitle={this.state.searchTitle}
                    onSearchChange={this.SearchNote}
                  />
                  {resultSearch.length !== 0 ? (
                    <ListNote notes={resultSearch} />
                  ) : (
                    <div className="notes-list-empty">
                      <p className="notes-list__empty">
                        {locale === "id" ? "Tidak Ada Catatan" : "Empty Notes"}
                      </p>
                    </div>
                  )}
                </div>
              </main>
            </>
          );
        }}
      </LocaleConsumer>
    );
  }
}

ArchivePage.propTypes = {
  keyword: propTypes.string,
  onSearchChange: propTypes.func,
};
