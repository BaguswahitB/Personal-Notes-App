import React from "react";
import propTypes from "prop-types";
import { useParams, useNavigate } from "react-router-dom";
import ViewsNote from "../components/notes/ViewsNote.js";
import {
  getNote,
  deleteNote,
  archiveNote,
  unarchiveNote,
} from "../utils/network-data.js";
import NotfoundPage from "./NotfoundPage.js";

export default function ViewsPages() {
  const navigate = useNavigate();
  const IdNote = useParams();
  return <ViewsPage id={IdNote.id} navigation={navigate} />;
}

class ViewsPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: {},
      initializing: true,
    };

    this.HandleArchive = this.HandleArchive.bind(this);
    this.HandleUnArchive = this.HandleUnArchive.bind(this);
    this.HandleDelete = this.HandleDelete.bind(this);
  }
  async componentDidMount() {
    const { data } = await getNote(this.props.id);
    this.setState(() => {
      return {
        notes: data,
        initializing: false,
      };
    });
  }

  async HandleArchive() {
    const { data } = await archiveNote(this.props.id);
    this.setState(() => {
      return {
        notes: data,
      };
    });
    this.props.navigation("/archives");
  }

  async HandleUnArchive() {
    const { data } = await unarchiveNote(this.props.id);
    this.setState(() => {
      return {
        notes: data,
      };
    });
    this.props.navigation("/");
  }

  async HandleDelete() {
    const { data } = await deleteNote(this.props.id);
    this.setState(() => {
      return {
        notes: data,
      };
    });
    this.props.navigation("/");
  }

  render() {
    if (this.state.initializing) {
      return null;
    }
    return (
      <>
        {!this.state.notes ? (
          <NotfoundPage />
        ) : (
          <ViewsNote
            {...this.state.notes}
            Delete={this.HandleDelete}
            Index={this.state.notes}
            Archive={this.HandleArchive}
            Active={this.HandleUnArchive}
          />
        )}
      </>
    );
  }
}

ViewsPage.propTypes = {
  id: propTypes.string,
  navigation: propTypes.func,
};
