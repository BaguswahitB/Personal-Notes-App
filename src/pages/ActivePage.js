import React from "react";
import SearchNote from "../components/notes/SearchNote.js";
import ListNote from "../components/notes/ListNote.js";
import propTypes from "prop-types";
import { getActiveNotes } from "../utils/network-data.js";
import { Link, useSearchParams } from "react-router-dom";
import { IoAddSharp } from "react-icons/io5";
import { LocaleConsumer } from "../contexts/LocaleContext.js";

export default function ActivePages() {
  const [searchParams, setSearchParams] = useSearchParams();
  const searchTitle = searchParams.get("searchTitle");
  function HandleSearchParams(searchTitle) {
    setSearchParams({ searchTitle });
  }

  return (
    <ActivePage keyword={searchTitle} onSearchChange={HandleSearchParams} />
  );
}

class ActivePage extends React.Component {
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
    const { data } = await getActiveNotes();
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
    const view = true;
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

                  <div className="homepage__action">
                    <Link to="/notes/new">
                      <button className="action" type="button">
                        <IoAddSharp />
                      </button>
                    </Link>
                  </div>
                </div>
              </main>
            </>
          );
        }}
      </LocaleConsumer>
    );
  }
}

ActivePage.propTypes = {
  keyword: propTypes.string,
  onSearchChange: propTypes.func,
};
