import React from "react";
import propTypes from "prop-types";
import { IoCheckmarkSharp } from "react-icons/io5";
import { LocaleConsumer } from "../../contexts/LocaleContext.js";

export default class NewNote extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      body: "",
    };
    this.handleTitle = this.handleTitle.bind(this);
    this.handleBody = this.handleBody.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleTitle(event) {
    this.setState(() => {
      return {
        title: event.target.value,
      };
    });
  }

  handleBody(event) {
    this.setState(() => {
      return {
        body: event.target.innerHTML,
      };
    });
  }

  handleSubmit(event) {
    event.preventDefault();
    this.props.addNote(this.state);
  }

  render() {
    return (
      <LocaleConsumer>
        {({ locale }) => {
          return (
            <main>
              <div className="add-new-page">
                <form onSubmit={this.handleSubmit}>
                  <div className="add-new-page__input">
                    <input
                      className="add-new-page__input__title"
                      placeholder={
                        locale === "id" ? "Catatan Rahasia" : "Secret Note"
                      }
                      value={this.state.title}
                      onChange={this.handleTitle}
                    />
                    <div
                      className="add-new-page__input__body"
                      data-placeholder={
                        locale === "id"
                          ? "Tulis Rahasiamu...."
                          : "Write your secret..."
                      }
                      required
                      contentEditable="true"
                      onInput={this.handleBody}
                    ></div>
                  </div>
                  <div className="add-new-page__action">
                    <button className="action" type="submit">
                      <IoCheckmarkSharp />
                    </button>
                  </div>
                </form>
              </div>
            </main>
          );
        }}
      </LocaleConsumer>
    );
  }
}

NewNote.propTypes = {
  addNote: propTypes.func.isRequired,
};
